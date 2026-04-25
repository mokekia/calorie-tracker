const User = require('../models/user')

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
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