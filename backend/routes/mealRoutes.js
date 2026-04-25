const express = require('express')
const router = express.Router()
const mealController = require('../controllers/mealController')

router.post('/', mealController.createMeal)
router.put('/:id', mealController.updateMeal)
router.get('/:userId', mealController.getAllMealsForUser)
router.get('/:userId/:date', mealController.getAllMealsByDateForUser)
router.delete('/:id', mealController.deleteMeal)

module.exports = router