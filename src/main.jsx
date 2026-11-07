import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router";
import Explore from "./routes/Explore.jsx";
import NotFound from "./routes/NotFound.jsx";
import ViewAnime from "./routes/ViewAnime.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App/>}>
          <Route path={"/"} />
          <Route path={"/createEntry"} />
          <Route path={"/editEntry/:id"} />
          <Route path={"/viewEntry/:id"} />
          <Route path={"/explore"} element={<Explore/>} />

        </Route>

        <Route path={"/explore/:id"} element={<ViewAnime/>} />
        <Route path={"*"} element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
