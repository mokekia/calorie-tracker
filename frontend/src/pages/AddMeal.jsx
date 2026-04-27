import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
const AddMeal = () => {
  const location = useLocation()
  const mealId = location.state.mealId
  const [ingredient, setIngredient] = useState("")
  const [weight, setWeight] = useState("")
  const [kcalPer100g, setKcalPer100g] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalCalories, setTotalCalories] = useState("")
  const navigate = useNavigate()
  
  console.log(mealId)

  const handleSubmit = async () => {
    const calculatedCalories = weight * (kcalPer100g/100)
    await fetch('http://localhost:3000/api/foodEntries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ingredient,
        weight: weight,
        kcalPer100g: kcalPer100g,
        mealId: mealId,
        calculatedCalories: calculatedCalories
    })
    })
    navigate('/')
  }
  const handleQuickAdd = async () => {
    await fetch('http://localhost:3000/api/foodEntries', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: ingredient,
        calculatedCalories: totalCalories,
        isQuickAdd: true,
        mealId: mealId
      })
    })
    navigate('/')
  }

  return (
    <div>
      <h1>Add Meal</h1>
      <input 
        value = {ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder='Ingredient Name'
      />
      <input 
        value = {weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder='Weight (Gram)'
      />
      <input 
        value = {kcalPer100g}
        onChange={(e) => setKcalPer100g(e.target.value)}
        placeholder='Kalories per 100g'
      />
      <button type="submit" onClick={handleSubmit}>Add Food</button>
          <button onClick={() => setIsModalOpen(true)}>Quick Add</button>
      {isModalOpen && (
        <div>
          <h2>Quick Add</h2>
          <input 
          value = {ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder='Ingredient Name'
          />
          <input 
          value = {totalCalories}
          onChange={(e) => setTotalCalories(e.target.value)}
          placeholder='Calories'
          />
          <button onClick={async () => {await handleQuickAdd(); setIsModalOpen(false)}}>Quick Add</button>
        </div>
      )}
    </div>
    
  )
}
export default AddMeal