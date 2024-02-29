require('dotenv').config();

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const PORT = 5000 || process.env.PORT;

// Static folder
app.use(express.static('public'));

//This will allow to pass url enconded bodies
app.use(express.urlencoded( { extended: true }));
app.use(expressLayouts);

// It s when we store our layouts
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use(require('./server/routes/recipeRoutes'));


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});