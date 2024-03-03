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
    req.flash('infoSubmit', 'Recipe has been added. ');
    res.redirect('submit-recipe');
};

// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Thai red chicken soup",
//         "description": `Sit the chicken in a large, deep pan.
//         Carefully halve the squash lengthways, then cut into 3cm chunks, discarding the seeds.
//         Slice the coriander stalks, add to the pan with the squash, curry paste and coconut milk, then pour in 1 litre of water. Cover and simmer on a medium heat for 1 hour 20 minutes.
//         Use tongs to remove the chicken to a platter. Spoon any fat from the surface of the soup over the chicken, then sprinkle with half the coriander leaves.
//         Serve with 2 forks for divvying up the meat at the table. Use a potato masher to crush some of the squash, giving your soup a thicker texture.
//         Taste, season to perfection with sea salt and black pepper, then divide between six bowls and sprinkle with the remaining coriander.
//         Shred and add chicken, as you dig in.
//         `,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 x 1.6 kg whole chicken",
//           "1 butternut squash (1.2kg)",
//           "1 bunch of fresh coriander (30g)",
//           "100 g Thai red curry paste",
//           "1 x 400 ml tin of light coconut milk"
//         ],
//         "category": "Thai", 
//         "image": "thai-soup.jpg"
//       },
//       { 
//         "name": "Hamburguer",
//         "description": `Peel and slice the onion, then place in a small bowl. Cover with the vinegar and set aside.
//         Mash all the veg well with a potato masher, then shred add the ham and season generously. Mix together well, then shape into 4 burgers and chill in the fridge to firm up, until ready to use.
//         Heat the butter and oil in a large frying pan over a medium heat and cook the burgers, in batches if needed, for 3 to 5 minutes each side or until crisping up and turning golden brown.
//         To serve, slice the muffins or burger rolls in half and fill with the bubble and squeak hamburgers, pickled red onion, lettuce and ketchup, if desired.`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "red onion",
//             "2 teaspoons cider vinegar",
//             "600 g mixed leftover roast veg, including potatoes, swede, parsnips, carrots, sprouts",
//             "280 g higher-welfare cooked ham",
//             "2 tablespoons unsalted butter",
//             "1 tablespoon olive oil",
//             "4 English muffins or rolls",
//             "1 handful of lettuce leaves, such as baby cos, frisée",
//             "ketchup , optional",
//         ],
//         "category": "American", 
//         "image": "hamb.jpg"
//       },

//       { 
//         "name": "Tofu",
//         "description": `Get your prep done first, for smooth cooking. Chop the steak into 1cm chunks, trimming away and discarding any fat.
//         Peel and finely chop the garlic and ginger and slice the chilli. Trim the spring onions, finely slice the top green halves and put aside, then chop the whites into 2cm chunks. Peel the carrots and mooli or radishes, and chop to a similar size.
//         Place a large pan on a medium-high heat and toast the Szechuan peppercorns while it heats up. Tip into a pestle and mortar, leaving the pan on the heat.
//         Place the chopped steak in the pan with 1 tablespoon of groundnut oil. Stir until starting to brown, then add the garlic, ginger, chilli, the white spring onions, carrots and mooli or radishes.
//         Cook for 5 minutes, stirring regularly, then stir in the chilli bean paste for 30 seconds until dark. Pour in the stock and simmer for 10 minutes.
//         Meanwhile, drain the beans, put them into a pan with the rice and a pinch of sea salt, and cover by 1cm with cold water. Place on a high heat, bring to the boil, then simmer until the water level meets the rice. Cover and leave on the lowest heat for 12 minutes, or until cooked through, stirring occasionally.
//         Taste the stew and season to perfection. Mix the cornflour with 2 tablespoons of cold water until combined, then stir into the stew.
//         Trim and stir in the broccoli. Chop the tofu into 2cm chunks and drop them in, then pop a lid on and keep on a low heat for 5 to 8 minutes while the stew thickens up and the broccoli just cooks through.
//         Serve the stew scattered with the sliced green spring onions, with the sticky rice and beans on the side. Finely crush and scatter over some Szechuan pepper. Nice with drips of chilli oil, to taste.`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "250g rump or sirloin steak",
//             "2 cloves of garlic",
//             "4cm piece of ginger",
//             "2 fresh red chilli",
//             "1 bunch of spring onions",
//             "2 large carrots",
//             "250g mooli or radishes",
//             "1 heaped teaspoon Szechuan peppercorns",
//             "groundnut oil",
//             "2 tablespoons Chinese chilli bean paste , (find it in Asian supermarkets)",
//             "1 litre veg stock",
//             "1 x 400g tin of aduki beans",
//             "250g pudding or risotto rice",
//             "1 tablespoon cornflour",
//             "200g tenderstem broccoli",
//             "350g firm silken tofu",
//         ],
//         "category": "Chinese", 
//         "image": "tofu.jpg"
//       },

//       { 
//         "name": "Mexican breakfast",
//         "description": `Peel and finely slice the onions and garlic. Deseed and finely slice the peppers and chillies.
//         Get a large frying pan (make sure you’ve got a lid to go with it) on a high heat and add several good lugs of olive oil.
//         Add the onion, garlic, peppers, fresh and dried chillies, bay leaves and a good pinch of sea salt and black pepper, and cook for 15 minutes, or until to softened and caramelised, stirring regularly.
//         Pour in the tomatoes, using a spoon or potato masher to break them up. Bring to the boil, then turn down to a medium heat and cook for a further 5 minutes to reduce the sauce.
//         When you’ve got a nice thick tomato stew consistency, have a taste and adjust the seasoning, if needed.
//         Slice the fresh tomatoes and lay them over the top of the mixture.
//         Use a spoon to make small wells in the tomato stew, then crack in the eggs so they poach in the thick, delicious juices – try to crack them in as quickly as you can so they all get to cook for roughly the same amount of time.
//         Season from a height, put the lid on and let the eggs cook for around 3 to 4 minutes, or until cooked to your liking.
//         Warm the tortillas while this is happening. You can pop them into the oven at 180°C/350°F/gas 4 for a few minutes, microwave them for a few seconds or even lay them over the lid of the pan so they heat up as the eggs cook.
//         Take the lid off and check your eggs by giving them a poke with your finger. When they’re done to your liking, turn the heat off and take the pan to the table with the warmed tortillas, the Cheddar and a grater so everyone can get involved and make their own. Personally, I like to grate a bit of cheese right on to a warm tortilla, spoon an egg and some of the wonderful tomato stew on top, wrap it up, and eat it right away. What a beautiful way to wake up!`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "1 onion            ",
//             "2 cloves of garlic",
//             "2 red peppers            ",
//             "2 fresh red or orange chillies            ",
//             "olive oil            ",
//             "1 large dried chilli            ",
//             "3 fresh bay leaves            ",
//             "2 x 400 g tins of quality plum tomatoes            ",
//             "2 large ripe tomatoes            ",
//             "6 large eggs            ",
//             "6 tortillas            ",
//         ],
//         "category": "Mexican", 
//         "image": "mexican-breakfast.jpg"
//       },

//       { 
//         "name": "Indian-inspired frittata",
//         "description": `Preheat the oven to 200°C/400°F/gas 6. Put a 26cm non-stick ovenproof frying pan on a medium heat and, one by one, lightly toast the chapatis. Meanwhile, in a large bowl, beat the eggs with half the mango chutney. Coarsely grate in most of the cheese, chop and add the spinach, then erratically tear in the toasted chapatis. Add a pinch of sea salt and black pepper and mix it all together well.

//         Put 1 tablespoon of olive oil into the frying pan, then pour in the egg mixture. Grate over the remaining cheese and sprinkle over the Bombay mix. Shake the pan over the heat for 1 minute, then transfer to the oven for 10 minutes, or until golden and set. Meanwhile, grate the onion, mix with a pinch of salt and 1 tablespoon of red wine vinegar and leave to quickly pickle. Serve the frittata dolloped with yoghurt and the remaining mango chutney, sprinkled with the drained pickled red onion.`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "4 wholemeal chapatis",
//             "8 large eggs",
//             "2 tablespoons mango chutney",
//             "50 g mature Cheddar cheese",
//             "200 g baby spinach",
//             "olive oil",
//             "30 g Bombay mix",
//             "½ a small red onion",
//            " red wine vinegar",
//             "2 tablespoons natural yoghurt",
//         ],
//         "category": "Indian", 
//         "image": "indian-frittata.jpg"
//       },

//       { 
//         "name": "Spanish tortilla",
//         "description": `Peel the potatoes using a speed-peeler, then carefully cut them into thin slices. Pat the potato slices dry with a clean tea towel.
//         Peel and finely slice the onion. Drizzle 2 tablespoons of oil into a small frying pan over a medium heat, then add the onion and potatoes.
//         Turn the heat down to low and cook for 25 to 30 minutes, or until the onions are turning golden and the potato slices are cooked through. Try not to stir it too much or the potatoes will break up – just use a fish slice to flip them over halfway through.
//         Crack the eggs into a mixing bowl, season with a tiny pinch of sea salt and black pepper, then whisk together with a fork.
//         When the onions and potatoes are cooked, remove the pan from the heat and carefully tip them into the eggs. Transfer the mixture back into the frying pan and place it over a low heat. Cook for around 20 minutes, or until there’s almost no runny egg on top.
//         Use a fish slice to slightly lift and loosen the sides of the tortilla. Carefully flip the pan over a dinner plate and tip out the tortilla, then slide it back into the pan and cook for another 5 minutes, or until golden and cooked through.
//         Turn out the tortilla onto a serving board, then cut into 6 wedges and serve hot or cold with a simple green salad.`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//             "300 g waxy potatoes",
//             "1 onion",
//             "olive oil",
//             "5 large free-range eggs",
//         ],
//         "category": "Spanish", 
//         "image": "spanish-tortilla.jpg"
//       },

//     ]);

//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// // insertDymmyRecipeData()