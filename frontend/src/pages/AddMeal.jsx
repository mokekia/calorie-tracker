import { useLocation } from 'react-router-dom'
import { useState } from 'react'
const AddMeal = () => {
  const location = useLocation()
  const mealId = location.state.mealId
  const [ingredient,setIngredient] = useState("")
  const [weight,setWeight] = useState("")
  const [kcalPer100g, setKcalPer100g] = useState("")
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
    </div>
    
  )
}
export default AddMeal