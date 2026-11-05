import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App/>}>
          <Route path={"/"} />
          <Route path={"/createEntry"} />
          <Route path={"/editEntry/:id"} />
          <Route path={"/viewEntry/:id"} />
          <Route path={"/explore"} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
