const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.get('/', recipeController.homePage);


module.exports = router;