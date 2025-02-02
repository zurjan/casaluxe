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


app.get("/Nyproduct", (req, res) => {
  res.render('Nyproduct', { title: 'Nyproduct Page' });
});




// Rutter
const indexRouter = require('./routes/index');
const NyproductRouter = require('./routes/Nyproduct');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const categoryRouter = require('./routes/category');

app.use('/', indexRouter);
app.use('/Nyproduct', NyproductRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/contact', contactRouter);
app.use('/category', categoryRouter);

// Exportera app (❗ Viktigt för bin/www.js ❗)
module.exports = app;
