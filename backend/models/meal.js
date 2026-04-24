const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
  meal_type: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snacks"]
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId is the unique ID for a document
    ref: 'User', // references the model 
    required: true
  },
  total_calories: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Meal', mealSchema)