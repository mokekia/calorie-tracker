const Meal = require('../models/meal')

const createMeal = async (req, res) => {
  try {
    const meal = await Meal.create(req.body)
    res.status(201).json(meal)  
  } catch (error) {
    res.status(500).json({message: error.message})  
  }
}

const findOrCreateMeal = async (req, res) => {
  try {
    const {userId, meal_type, date} = req.body
    const meal = await Meal.findOneAndUpdate(
      {userId, meal_type, date}, // search for data
      { $setOnInsert: { userId, meal_type, date, total_calories: 0 } }, // create if it does not exist
      { upsert: true, new: true } // create if it does not exist
    )
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json({message: error.message})   
  }
}

const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(meal)  
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}

const getAllMealsForUser = async (req, res) => {
  try {
    const meals = await Meal.find({userId: req.params.userId})
    res.status(200).json(meals)
  } catch (error) {
    res.status(500).json({message: error.message})  
  }
}

const getAllMealsByDateForUser = async (req, res) => {
  try {
    const meals = await Meal.find({userId: req.params.userId, date: req.params.date})
    res.status(200).json(meals)    
  } catch (error) {
    res.status(500).json({message: error.message})  
  }
}
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id)
    res.status(200).json(meal)
  } catch (error) {
    res.status(500).json({message: error.message})      
  }
} 

module.exports = {createMeal, findOrCreateMeal, updateMeal, getAllMealsForUser, getAllMealsByDateForUser, deleteMeal}