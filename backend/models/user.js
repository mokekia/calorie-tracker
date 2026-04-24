const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0
  },
  height: {
    type: Number,
    required: true,
    min: 0
  },
  age: {
    type: Number,
    required: true
  },
  activity_level: {
    type: String,
    required: true,
    enum: ["sedentary", "lightly_active", "moderatly_active","highly_active"]
  },
  goal: {
    type: Number,
    required: true,
    enum: [-0.8, -0.5, 0, 0.5, 0.8]
  },
  dailyCalorieGoal: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)