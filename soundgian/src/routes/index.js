const router = require('express').Router();
const page = require('../controllers/page.controller');
const checkout = require('../controllers/checkout.controller');

router.get('/', page.home);
router.get('/checkout', checkout.form);
router.post('/checkout', checkout.start);
router.get('/checkout/callback', checkout.callback); // retorno del proveedor
router.get('/checkout/mock', checkout.mockPage);     // solo para el proveedor mock
router.get('/checkout/cancel', checkout.cancel);

module.exports = router;
