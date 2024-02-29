exports.homePage = async (req, res) => {
    res.render('index', { title: 'Cooking Blog - Homepage'}); // Changing the name of the title in layouts/main.js
};