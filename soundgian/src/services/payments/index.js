// Cada proveedor implementa: createOrder(order) -> { redirectUrl } y confirm(query) -> { orderId, approved }
const { provider } = require('../../config');

const providers = {
  mock: require('./mock'),
  payphone: require('./payphone'),
};

if (!providers[provider]) throw new Error(`PAYMENT_PROVIDER inválido: ${provider}`);
module.exports = providers[provider];
