import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import Header from "../components/Header"
import UserDeck from "../components/UserDeck"
import UserContext from "../contexts/UserContext"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"

import { Main, Decks } from "../styles/userStyles"
import { Menu } from "../styles/homeStyles"

export default function Home() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const offset = 0

    // FIXME:
    setLoading(false)
    // const promise = deckRepository.getAllDecks(offset, user.token)
    // promise
    //   .then(({ data }) => {
    //     setDecks(data)
    //   })
    //   .catch((e) => {
    //     logout(e.response.data, navigate)
    //   })
    //   .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <Main>
        <Menu>
          <h1 className={pathname === "/" ? "selected" : ""} onClick={() => navigate("/")}>
            Home
          </h1>
          <h1 className={pathname === "/favorites" ? "selected" : ""} onClick={() => navigate("/favorites")}>
            Favorites
          </h1>
        </Menu>

        <Decks>
          {loading ? (
            <p className="notice">Loading decks...</p>
          ) : decks.length > 0 ? (
            decks.map((deck, i) => {
              return <UserDeck key={i} cardData={deck} />
            })
          ) : (
            <p className="notice">You don't have any favorites</p>
          )}
        </Decks>
      </Main>
    </>
  )
}
