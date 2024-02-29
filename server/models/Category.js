const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [ true, 'This field is required. ']
    },

    image: {
        type: String,
        required: [ true, 'This field is required. ']
    }

});

module.exports = new mongoose.model('Category', CategorySchema);