const path = require('path');
const express = require('express');
const helmet = require('helmet');
const config = require('./config');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({ contentSecurityPolicy: false })); // ajustar CSP al pasar a producción
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', require('./routes'));

app.use((req, res) => res.status(404).render('pages/message', { title: 'No encontrada', text: 'La página que buscas no existe.' }));

app.listen(config.port, () => console.log(`http://localhost:${config.port}  (pagos: ${config.provider})`));
