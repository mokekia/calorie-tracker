const express = require('express')
const foodEntryController = require('../controllers/foodEntryController')
const router = express.Router()

router.post('/', foodEntryController.createFoodEntry)
router.put('/:id', foodEntryController.updateFoodEntry)
router.get('/:mealId', foodEntryController.getAllFoodEntriesForMeal)
router.delete('/:id', foodEntryController.deleteFoodEntry)

module.exports = router