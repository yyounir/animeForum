import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router";
import Explore from "./routes/Explore.jsx";
import NotFound from "./routes/NotFound.jsx";
import ViewAnime from "./routes/ViewAnime.jsx";
import Forum from "./routes/Forum.jsx";
import Home from "./routes/Home.jsx";
import ViewPost from "./routes/ViewPost.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App/>}>
          <Route path={"/"} element={<Home/>} />
          <Route path={"/explore"} element={<Explore/>} />
          <Route path={"/forum"} element={<Forum/>} />

        </Route>

        <Route path={"/explore/:id"} element={<ViewAnime/>} />
        <Route path={"/viewEntry"} element={<ViewPost/>} />
        <Route path={"*"} element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
