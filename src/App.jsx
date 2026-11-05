import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from "./components/Header.jsx";

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [villageInfo, setVillageInfo] = useState([])


  return (
    <>
      <Header title={"Ninjutsu Forums"} />
      <p className={"dark:text-white"}>I like cats</p>
    </>
  )
}

export default App
