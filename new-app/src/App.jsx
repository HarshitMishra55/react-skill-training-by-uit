import { useState } from 'react'
import SimpleList from './components/SimpleList.jsx'
import TodoList from './components/TodoList.jsx'
import SearchWithDebounce from './components/SearchWithDebounce.jsx'
import InfiniteScrolling from './components/InfiniteScrolling.jsx'
import { PaginatedList } from './components/PaginatedList.jsx'
import { LiveSearchAPI } from './components/LiveSearchAPI.jsx'
import './App.css'

function App() {
  return (
    <>
      <marquee><h1>Harshit Mishra</h1></marquee>
      <LiveSearchAPI />
      <SimpleList />
      <TodoList />
      <PaginatedList />
      <SearchWithDebounce />
      <InfiniteScrolling />
    </>
  )
}

export default App
