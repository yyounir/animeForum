import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  useEffect(() => {
    console.log("Meow!")
  }, [])

  return (
    <>
      <p className='bg-white text-center'>This is an official website</p>
    </>
  )
}

export default App
