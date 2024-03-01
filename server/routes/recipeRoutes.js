const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.get('/', recipeController.homePage);
router.get('/categories', recipeController.exploreCategories);


module.exports = router;