require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const { flash } = require('express-flash-message');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = process.env.PORT || 5000; // ดึงลิ้งจาก .env เพื่อต่อเข้า mongoDB 

// เชื่อม db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// static files
app.use(express.static('public'));

// express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

// flash messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

// templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// เชื่อมต่อ routes
app.use('/', require('./server/routes/record'))

// ต่อไปยัง error 404
app.get('*', (req, res) => {
  res.status(404).render('404');
});

// ต่อขึ้น localhost:5000
app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
