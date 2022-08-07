import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Deck from "./pages/Deck"
import User from "./pages/User"
import Creation from "./pages/Creation"

import UserContext from "./contexts/UserContext"

export default function App() {
  let savedUser = JSON.parse(localStorage.getItem("twizz-user"))
  if (savedUser === null) {
    savedUser = {}
  }

  const [user, setUser] = useState(savedUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/deck/:id" element={<Deck />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/creation" element={<Creation />} />
          <Route path="*" element={<h1>This page doesn't exist...</h1>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
