const { product } = require('../config');

// Contenido separado de la vista: luego puede venir de una DB.
const features = [
  { icon: 'mic', title: 'Micrófonos', text: 'Tipos, patrones polares y cómo elegir el ideal según la fuente de sonido.' },
  { icon: 'wave', title: 'Ecualización', text: 'Técnicas de ecualización correctiva y creativa para lograr mezclas limpias y profesionales.' },
  { icon: 'plug', title: 'Cables y conexiones', text: 'Diferencias entre cables balanceados y no balanceados, cajas directas y cómo evitar ruidos.' },
  { icon: 'sliders', title: 'Consolas', text: 'Analógicas vs. digitales, estructura de un channel strip y cómo optimizar la ganancia.' },
  { icon: 'door', title: 'Gate', text: 'Bloquea ruidos molestos y limpia la mezcla sin afectar la señal principal.' },
  { icon: 'gauge', title: 'Compresor', text: 'Domina la dinámica, controla picos y logra un sonido más equilibrado y potente.' },
  { icon: 'phones', title: 'Paneo y mezcla estéreo', text: 'Distribución de los instrumentos en el espacio para lograr claridad y amplitud.' },
  { icon: 'wrench', title: 'Solución de problemas', text: 'Feedback, ruidos molestos, señales débiles y cómo solucionarlos en segundos.' },
];

exports.home = (req, res) => res.render('pages/home', { title: product.name, product, features });
