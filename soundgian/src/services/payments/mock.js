// Simula una pasarela para probar el flujo sin credenciales.
exports.createOrder = async (order) => ({ redirectUrl: `/checkout/mock?ref=${order.id}` });

exports.confirm = async (query) => ({ orderId: query.ref, approved: query.status === 'ok' });
