import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
const Dashboard = ({ user }) => {
  console.log(user)
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  const location = useLocation()
  const [selectedMealId, setSelectedMealId] = useState(null)
  const [foodEntries, setFoodEntries] = useState([])

  useEffect(() => {
    if (!selectedMealId) return
    const fetchFoodEntries = async () => {
      const response = await fetch(`http://localhost:3000/api/foodEntries/${selectedMealId}`)
      const data = await response.json()
      setFoodEntries(data)
      console.log(foodEntries)
    } 
    fetchFoodEntries()
  }, [selectedMealId])


  useEffect(() => {
    const fetchMeals = async () => {
      console.log('fetching meals')
      const response = await fetch('http://localhost:3000/api/meals/69ef85687f3b2019d2b3235c')
      const data = await response.json()
      setMeals(data)
      console.log(data)
    }
    fetchMeals()
  }, [location])


  if (!user) return <p>Loading...</p>
  if (!meals) return <p>Loading...</p>
  const totalEaten = meals.reduce((sum, meal) => sum + meal.total_calories, 0)
  const caloriesLeft = user.dailyCalorieGoal - totalEaten

  const handleMealSelect = async (userId, meal_type, date) => {
    const response = await fetch('http://localhost:3000/api/meals/findOrCreate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId,
        meal_type: meal_type,
        date: date
      })
    })
    const data = await response.json()
    navigate('/AddMeal', {state: { mealId: data._id }})
  }
  return (
    <div>
      <h1>Dashboard {user.name}</h1>
      
      <div style={{width: '200px'}}>
        <CircularProgressbar
          value={totalEaten}
          maxValue={user.dailyCalorieGoal}
          text={`${caloriesLeft} kcal left`}
          styles={buildStyles({
            textSize: '12px'
          })}
        />  
      </div>
      
      <p>Calories left: {caloriesLeft}</p>
      {meals.map((meal) => (
       <div key={meal._id} onClick={() => setSelectedMealId(meal._id)}>
        <p>{meal.meal_type}: {meal.total_calories}</p>
        {meal._id === selectedMealId && ( // MODAL
          <div>
            {foodEntries.map((entry) => (
              <p key={entry._id}>{entry.name}: {entry.calculatedCalories} kcal left</p>
            ))}
          </div>  
        )}
       </div>
        
    ))}
      <button onClick={() => handleMealSelect(user._id, 'breakfast', new Date().toISOString().split('T')[0])}>Add Breakfast</button>
      <button onClick={() => handleMealSelect(user._id, 'lunch', new Date().toISOString().split('T')[0])}>Add Lunch</button>
      <button onClick={() => handleMealSelect(user._id, 'snacks', new Date().toISOString().split('T')[0])}>Add Snacks</button>
      <button onClick={() => handleMealSelect(user._id, 'dinner', new Date().toISOString().split('T')[0])}>Add Dinner</button>
    </div>
  )
}
export default Dashboard