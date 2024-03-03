require('dotenv').config();

const express = require('express');
const app = express();

const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const PORT = 5000 || process.env.PORT;
const db = require('./database/db');
db();

// Static folder
app.use(express.static('public'));

//This will allow to pass url enconded bodies
app.use(express.urlencoded( { extended: true }));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use(fileUpload());


// It s when we store our layouts
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use(require('./server/routes/recipeRoutes'));


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});