import { useState } from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import './App.css'
import './styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="background">
      <Navbar />
      <Main />
    </div>
  )
}

export default App
