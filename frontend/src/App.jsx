import { useState, useEffect } from 'react'
const App = () => {
  const [calories, setCalories] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/api/users/69ee229b39697d4a79f02031')
      const data = await response.json()
      setUser(data)
      console.log(data)
    }
    fetchUser()
    }, [])

  return (
    <div>
      <h1>Calorie Tracker</h1>
      <p>Kalorier: {calories}</p>
      <button onClick={() => setCalories(calories + 100)}>
        Add 100 calories
      </button>
    </div>
  )
}

export default App