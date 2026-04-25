const FoodEntry = require('../models/foodEntry')

const createFoodEntry = async (req, res) => {
  try {
    const foodEntry = await FoodEntry.create(req.body)
    res.status(201).json(foodEntry)
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}
const updateFoodEntry = async (req, res) => {
  try {
    const foodEntry = await FoodEntry.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(foodEntry)
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}
const getAllFoodEntriesForMeal = async (req, res) => {
  try {
    const foodEntries = await FoodEntry.find({mealId: req.params.mealId})
    res.status(200).json(foodEntries)
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}

const deleteFoodEntry = async (req, res) => {
  try {
    const foodEntry = await FoodEntry.findByIdAndDelete(req.params.id)
    res.status(200).json(foodEntry)
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}
module.exports = {createFoodEntry, updateFoodEntry, getAllFoodEntriesForMeal, deleteFoodEntry}