const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: 'This field is required.'
  },

  description: {
    type: String,
    required: 'This field is required.'
  },

  email: {
    type: String,
    required: 'This field is required.'
  },

  ingredients: {
    type: Array,
    required: 'This field is required.'
  },

  category: {
    type: String,
    // We only want to have specific categories. The ones saved in the database
    enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian', 'Spanish'],
    required: 'This field is required.'
  },

  image: {
    type: String,
    required: 'This field is required.'
  },
  
});

module.exports = new mongoose.model('Recipe', RecipeSchema);