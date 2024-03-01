const Category = require('../models/Category');

exports.homePage = async (req, res) => {
    try {
        // Once we want to show only 5 types of categories we use this const limited to 5
        const limit = 5;
        const categories = await Category.find({});
        res.render('index', { title: 'Cooking Blog - Homepage', categories }); // Changing the name of the title in layouts/main.js // Displaying categories in home page

    }  
    catch (error) {
        res.status(500).send({ message: error.message || 'An error occured.'});
    }
};

