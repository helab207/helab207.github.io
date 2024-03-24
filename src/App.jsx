import { useState } from 'react'
import BasicLayout from './layout/basicLayout/index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BasicLayout/>
    </>
  )
}

export default App
