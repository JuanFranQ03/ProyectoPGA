// PayPhone (Ecuador) - Botón/Cajita de pagos. Verifica endpoints y campos en la documentación
// oficial de PayPhone Developers antes de pasar a producción.
const { baseUrl, payphone, product } = require('../../config');

const API = 'https://pay.payphonetodoesposible.com/api';
const headers = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${payphone.token}` });

exports.createOrder = async (order) => {
  const cents = Math.round(order.amount * 100);
  const res = await fetch(`${API}/button/Prepare`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      amount: cents,
      amountWithoutTax: cents,
      tax: 0,
      currency: product.currency,
      clientTransactionId: order.id,
      storeId: payphone.storeId,
      email: order.email,
      reference: product.name,
      responseUrl: `${baseUrl}/checkout/callback`,
      cancellationUrl: `${baseUrl}/checkout/cancel`,
    }),
  });
  if (!res.ok) throw new Error(`PayPhone Prepare falló (${res.status})`);
  const data = await res.json();
  // 'card' = pagar con tarjeta en PayPhone; 'payphone' = con la app/billetera
  return { redirectUrl: order.method === 'payphone' ? data.payWithPayPhone : data.payWithCard };
};

// PayPhone vuelve con ?id=<transaccion>&clientTransactionId=<tu orden>
exports.confirm = async ({ id, clientTransactionId }) => {
  const res = await fetch(`${API}/button/V2/Confirm`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ id: Number(id), clientTxId: clientTransactionId }),
  });
  const data = await res.json();
  return { orderId: clientTransactionId, approved: data.statusCode === 3 }; // 3 = aprobada
};
