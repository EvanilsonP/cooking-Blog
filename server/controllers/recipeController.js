const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

// GET - HOMEPAGE
exports.homePage = async (req, res) => {
    try {
        // Once we want to show only 5 types of categories we use this const limited to 5
        const limitNumber = 5;
        // Grabbing all categories from the database
        const categories = await Category.find({}).limit(limitNumber);
        // latest recipes - render in homepage
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        // Only show thai recipes
        const thai = await Recipe.find({ 'category': 'Thai'}).limit(limitNumber);
        // Only show american recipes
        const american = await Recipe.find({ 'category': 'American'}).limit(limitNumber);
        // // Only show chinese recipes
        const chinese = await Recipe.find({ 'category': 'Chinese'}).limit(limitNumber);

        const food = { latest, thai, american, chinese };
        res.render('index', { title: 'Cooking Blog - Homepage', categories, food}); // Changing the name of the title in layouts/main.js // Displaying categories in home page

    }  
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// GET - CATEGORIES
exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog -  Categories', categories});
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// GET - CATEGORIES:ID
exports.exploreCategoriesById = async(req, res) => { 
    try {
        const categoryId = req.params.id;
        const categoryById = await Recipe.find({ 'category': categoryId});
        res.render('categories', { title: 'Cooking Blog - Categories', categoryById});
    } 
    catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
} 

// GET - RECIPE:ID
exports.exploreRecipe = async (req, res) => {
    try {
        // Grabbing ID from a recipe
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', { title: 'Cooking Blog - Recipe', recipe});
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// SEARCH
exports.search = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true }});
        res.render('search', { title: 'Cooking Blog - Search', recipe});
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// GET - EXPLORE LATEST RECIPES
exports.exploreLatest = async (req, res) => {
    try {
        const latestRecipes = await Recipe.find({}).sort({ _id: -1});
        res.render('explore-latest', { title: 'Cooking Blog - Latest Recipes', latestRecipes});
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// EXPLORE RANDOM AS JSON
exports.exploreRandom = async (req, res) => {
    try {
        // Counting how many recipes there are
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random () * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('explore-random', { title: 'Cooking Blog - Explore Random', recipe});
        
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// GET - SUBMIT RECIPE PAGE
exports.submitRecipe = async (req, res) => {
    try {
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');

        res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj, infoSubmitObj });
    } 
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

// POST - SUBMIT RECIPE
exports.submitRecipeOnPost = async (req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;
        // If no file is uploaded
        if(!req.files || Object.keys(req.files).length === 0){
          console.log('No Files where uploaded.');
        } else {
    
          imageUploadFile = req.files.image;
          newImageName = Date.now() + imageUploadFile.name;
    
          uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
    
          imageUploadFile.mv(uploadPath, function(err){
            if(err) return res.satus(500).send(err);
          })
    
        }

        // Save recipe to the db
        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
          });
          
          await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added. ');
        res.redirect('/submit-recipe');
    } 
    catch (error) {
        req.flash('infoErrors', error);
        console.log(error);
        res.redirect('/submit-recipe');
    }
};

// Update recipe locally
// const updateRecipe = async (req, res) => {
//     try {
//         const res = await Recipe.updateOne({ name: 'Modified'}, { name: 'American Pizza'});
//         res.n; // Number of documents matched
//         res.nModified // Number of documents modified
//     } 
//     catch (error) {
//        console.log(error); 
//     }
// };

// updateRecipe();