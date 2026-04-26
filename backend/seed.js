const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const User = require('./models/user')
const Meal = require('./models/meal')
const FoodEntry = require('./models/foodEntry')

const seedDatabase = async () =>{
	try {
		await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Deletes current data
    await User.deleteMany()
    await Meal.deleteMany()
    await FoodEntry.deleteMany()

    const users = await User.insertMany([
      {name: 'Alex', weight: 75, height: 178, age: 25, gender: "male", activity_level: "sedentary", goal: -0.5},
      {name: 'Sara', weight: 62, height: 165, age: 28, gender: "female", activity_level: "lightly_active", goal: 0},
      {name: 'Erik', weight: 90, height: 185, age: 32, gender: "male", activity_level: "moderately_active", goal: -0.8},
      {name: 'Lisa', weight: 55, height: 160, age: 22, gender: "female", activity_level: "highly_active", goal: 0.5},
      {name: 'Karim', weight: 80, height: 180, age: 30, gender: "male", activity_level: "lightly_active", goal: 0}
    ])

    const meals = await Meal.insertMany([
      {meal_type: "breakfast", date: "2024-01-15", userId: users[0].id, total_calories: 450},
      {meal_type: "lunch", date: "2024-01-15", userId: users[1].id, total_calories: 600},
      {meal_type: "dinner", date: "2024-01-15", userId: users[2].id, total_calories: 800},
      {meal_type: "snacks", date: "2024-01-15", userId: users[3].id ,total_calories: 200},
      {meal_type: "lunch", date: "2024-01-15", userId: users[4].id, total_calories: 700}
    ])

    const foodEntries = await FoodEntry.insertMany([
      {name: "Oalmeal", weight: 80, kcalPer100g: 350, calculatedCalories: 280,  isQuickAdd: false, mealId: meals[0].id},
      {name: "Chicken breast", weight: 200, kcalPer100g: 165, calculatedCalories:330, isQuickAdd: false, mealId: meals[1].id},
      {name: "Pasta", weight: 150, kcalPer100g: 370, calculatedCalories: 555, isQuickAdd: false, mealId: meals[2].id},
      {name: "Protein bar", calculatedCalories: 200, isQuickAdd: true, mealId: meals[3].id},
      {name: "Rice", weight: 180, kcalPer100g: 350, calculatedCalories: 630, isQuickAdd: false, mealId: meals[4].id},
    ])
    console.log('Database seeded')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }	
}
seedDatabase()