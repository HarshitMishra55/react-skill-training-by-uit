import { useState } from 'react'
import SimpleList from './components/SimpleList.jsx'
import TodoList from './components/TodoList.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <marquee><h1>Harshit Mishra</h1></marquee>
      <SimpleList />
      <TodoList />
    </>
  )
}

export default App
