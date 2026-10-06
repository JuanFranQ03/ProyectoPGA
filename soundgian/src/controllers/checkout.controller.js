const crypto = require('crypto');
const { product, coupons } = require('../config');
const payments = require('../services/payments');

// Cuando agregues DB, reemplaza este Map por un modelo Order.
const orders = new Map();
const METHODS = ['card', 'payphone'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const render = (res, extra = {}) =>
  res.status(extra.errors ? 400 : 200).render('pages/checkout', {
    title: 'Finalizar compra', product, errors: {}, values: {}, ...extra,
  });

exports.form = (req, res) => render(res);

exports.start = async (req, res, next) => {
  try {
    const { email = '', emailConfirm = '', name = '', coupon = '', method = 'card' } = req.body;
    const values = { email: email.trim(), emailConfirm: emailConfirm.trim(), name: name.trim(), coupon: coupon.trim().toUpperCase(), method };

    const errors = {};
    if (!EMAIL_RE.test(values.email)) errors.email = 'Ingresa un email válido.';
    if (values.email.toLowerCase() !== values.emailConfirm.toLowerCase()) errors.emailConfirm = 'Los emails no coinciden.';
    if (values.name.length < 3) errors.name = 'Ingresa tu nombre completo.';
    if (!METHODS.includes(method)) errors.method = 'Selecciona un método de pago.';
    const discount = values.coupon ? coupons[values.coupon] : 0;
    if (values.coupon && !discount) errors.coupon = 'Ese cupón no es válido.';
    if (Object.keys(errors).length) return render(res, { errors, values });

    // El precio siempre se calcula en el servidor, nunca viene del formulario.
    const amount = Math.round(product.price * (1 - discount) * 100) / 100;
    const order = { id: crypto.randomUUID().replace(/-/g, '').slice(0, 20), productId: product.id, amount, email: values.email, name: values.name, coupon: values.coupon || null, method, status: 'pending' };
    orders.set(order.id, order);

    const { redirectUrl } = await payments.createOrder(order);
    res.redirect(redirectUrl);
  } catch (err) { next(err); }
};

exports.mockPage = (req, res) => res.render('pages/mock', { title: 'Pago de prueba', ref: req.query.ref });

exports.callback = async (req, res, next) => {
  try {
    const result = await payments.confirm(req.query);
    const order = orders.get(result.orderId);
    if (order) order.status = result.approved ? 'paid' : 'failed';
    if (!result.approved) return res.render('pages/message', { title: 'Pago no aprobado', text: 'No se completó el pago. Puedes intentarlo de nuevo.' });
    // Aquí luego: enviar el ebook a order.email (Nodemailer)
    res.render('pages/message', { title: '¡Pago aprobado!', text: 'Gracias por tu compra. Recibirás el ebook por email.' });
  } catch (err) { next(err); }
};

exports.cancel = (req, res) =>
  res.render('pages/message', { title: 'Pago cancelado', text: 'No se realizó ningún cobro.' });
