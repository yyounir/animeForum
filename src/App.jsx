import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from "./components/Header.jsx";
import {GitHubIcon} from "./components/GitHubIcon.jsx";
import {InfoIcon} from "lucide-react";
import Modal from "./components/Modal.jsx";
import Menu from "./components/Menu.jsx";
import {Outlet} from "react-router";

function App() {
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalMounted, setIsModalMounted] = useState(false)
  const [modalTitle, setModalTile] = useState("")
  const [modalText, setModalText] = useState("")
  const [modalActions, setModalActions] = useState([{
    primary: "OK",
    primaryOnClick: () => setIsModalOpen(false),
    secondary: "Cancel",
    secondaryOnClick: () => setIsModalOpen(false),
  }])

  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  // Toggle Menu
  const openMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      return;
    }

    setIsMenuMounted(true);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const unmountMenu = () => {
    setIsMenuMounted(false);
  };

  const openAboutProject = () => {
    setModalTile("About this Project")
    setModalText(["AnimeCorner", "Project made by Yasir Y."])
    setIsModalMounted(true)
    setIsModalOpen(true)
    setModalActions([{
      primary: "OK",
      secondary: null,
      primaryOnClick: () => setIsModalOpen(false),
      secondaryOnClick: () => setIsModalOpen(false),
    }])
  }

  const menuOptions = [
        {
            id: 1,
            icon: GitHubIcon,
            option: "View Projects",
            link: "https://github.com/yyounir"
        },
        {
            id: 2,
            icon: InfoIcon,
            option: "About Project",
            link: null,
            onClick: openAboutProject,
        },
    ]








  return (
    <>
      <Header title={"AnimeCorner"} openMenu={openMenu} />

      {isMenuMounted && (
        <Menu
          isOpen={isMenuOpen}
          openMenu={closeMenu}
          onCloseComplete={unmountMenu}
          openingPosition={"top-right"}
          menuOptions={menuOptions}
        />
      )}

      {isModalMounted && (
        <Modal
          title={modalTitle}
          message={modalText}
          isOpen={isModalOpen}
          onCloseComplete={() => setIsModalMounted(false)}
          actions={modalActions}
        />
      )}

      <div className={"mt-20"}>
        <Outlet />
      </div>
    </>
  )
}

export default App
