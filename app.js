const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Session för användarhantering
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

const paymentRouter = require('./routes/payment');
app.use('/payment', paymentRouter);


// Rutter
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const categoryRouter = require('./routes/category');
const nyproduktRouter = require('./routes/nyprodukt');
const basketRouter = require('./routes/basket');




app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/contact', contactRouter);
app.use('/category', categoryRouter);
app.use('/nyprodukt', nyproduktRouter);
app.use('/basket', basketRouter);

// Exportera app (❗ Viktigt för bin/www.js ❗)
module.exports = app;
