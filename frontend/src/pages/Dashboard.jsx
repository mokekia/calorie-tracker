import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const Dashboard = ({ user }) => {
  console.log(user)
  const navigate = useNavigate()
  const [meals, setMeals] = useState([])
  
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/api/meals/69ee229b39697d4a79f02031')
      const data = await response.json()
      setMeals(data)
      console.log(data)
    }
    fetchMeals()
  }, [])

  if (!user) return <p>Loading...</p>
  if (!meals) return <p>Loading...</p>
  return (
    <div>
      <h1>Dashboard {user.name}</h1>
      {meals.map((meal) => (
       <div key={meal._id}>
        <p>{meal.meal_type}: {meal.total_calories}</p>
        <button onClick={() => navigate('/AddMeal', {state: {mealId: meal._id}})}>Add Food</button>
       </div> 
    ))}
    </div>
  )
}
export default Dashboard