import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [villageInfo, setVillageInfo] = useState([])


  return (
    <>
      <p className={"text-white"}>I like cats</p>
    </>
  )
}

export default App
