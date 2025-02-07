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

// Rutter
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const categoryRouter = require('./routes/category');
const nyproduktRouter = require('./routes/nyprodukt');

app.get("/nyprodukt/:urlSlug", function (req, res) {
  const urlSlug = req.params.urlSlug;  

  try {
      const post = db.prepare("SELECT * FROM posts WHERE urlSlug = ?").get(urlSlug);
      if (post) {
        res.render('nyprodukt', { title: post.namn, product: post });
      } else {
          res.status(404).send("Product not found");
      }
  } catch (err) {
      console.error("Database Error:", err);
      res.status(500).send("Internal Server Error");
  }
});



app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/contact', contactRouter);
app.use('/category', categoryRouter);
app.use('/nyprodukt', nyproduktRouter);

// Exportera app (❗ Viktigt för bin/www.js ❗)
module.exports = app;
