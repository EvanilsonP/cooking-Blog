const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');


router.get('/', recipeController.homePage);
router.get('/recipe/:id', recipeController.exploreRecipe);

router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);

router.post('/search', recipeController.search);

router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);

router.get('/submit-recipe', recipeController.submitRecipe);


module.exports = router;