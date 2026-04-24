const mongoose = require('mongoose')

const foodEntrySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
  },
  kcalPer100g: {
    type: Number,
  },
  calculatedCalories: {
    type: Number
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: true
  },
  isQuickAdd: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('FoodEntry', foodEntrySchema)