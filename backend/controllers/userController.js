const User = require('../models/user')

const createUser = async (req, res) => {
  try {
    const {weight, height, age, gender, activity_level, goal} = req.body
    let bmr
    if (gender === "male") {
      bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
    }
    else{
      bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)
    }
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725
    }
    const tdee = bmr * activityMultipliers[activity_level]
    let dailyCalorieGoal
    if(goal === 0) {
      dailyCalorieGoal = tdee
    } else{
      dailyCalorieGoal = tdee + (goal * 1100)
    }
    const user = await User.create({...req.body, dailyCalorieGoal})
    res.status(201).json(user)  
  } catch (error) {
    res.status(400).json({message: error.message})  
  }  
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)  
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(user)  
  } catch (error) {
    res.status(400).json({message: error.message})  
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(user)  
  } catch (error) {
    res.status(400).json({message: error.message})  
  } 
}

module.exports = {createUser, getUserById, updateUser, deleteUser}