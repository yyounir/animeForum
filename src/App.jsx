import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  const fetchAnime = async() => {
    try {
      console.log("Fetching data...")
      const response = await fetch(`https://api.jikan.moe/v4/anime/1`);

      if (!response.ok) {
        console.error("Failed to fetch at", response.status)
      }

      const data = await response.json();
      console.log("Fetching data...")
      console.log(data)
    }
    catch(error) {
      console.error("Could not fetch anime: ", error)
    }
  }

  useEffect(() => {
    fetchAnime()
  }, [])

  return (
    <>

    </>
  )
}

export default App
