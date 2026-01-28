import { useState } from 'react'
import SimpleList from './components/SimpleList.jsx'
import TodoList from './components/TodoList.jsx'
import { PaginatedList } from './components/PaginatedList.jsx'
import SearchWithDebounce from './components/SearchWithDebounce.jsx'
import InfiniteScrolling from './components/InfiniteScrolling.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <marquee><h1>Harshit Mishra</h1></marquee>
      <SimpleList />
      <TodoList />
      <PaginatedList />
      <SearchWithDebounce />
      <InfiniteScrolling />
    </>
  )
}

export default App
