require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  provider: process.env.PAYMENT_PROVIDER || 'mock',
  product: {
    id: 'ebook-aprende-sonido',
    name: 'Aprende Sonido: Fundamentos, Equipos y Técnicas',
    regularPrice: 24.9,
    price: 14.9,
    currency: 'USD',
  },
  coupons: { SOUND10: 0.10 }, // código -> descuento (luego, tabla en DB)
  payphone: {
    token: process.env.PAYPHONE_TOKEN,
    storeId: process.env.PAYPHONE_STORE_ID,
  },
};
