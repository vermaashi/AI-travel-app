import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Hero from './components/ui/custom/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h1>Welcome to the first project</h1>
      <Button>hit me</Button> */}
      <Hero/>
    </>
  )
}

export default App
