import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import logo from './logo.svg'
import './App.css'

function App() {
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch({ type: 'COMPONENT_ACTION', payload: 'something' })
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>
          Click me
        </button>
      </header>
    </div>
  )
}

export default App
