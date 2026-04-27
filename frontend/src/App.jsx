import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddMeal from './pages/AddMeal'
import { useState, useEffect } from 'react'
const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('http://localhost:3000/api/users/69ef85687f3b2019d2b3235c')
      const data = await response.json()
      setUser(data)
      console.log(data)
    }
    fetchUser()
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard user={user}/>}/>
        <Route path="/AddMeal" element={<AddMeal/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App