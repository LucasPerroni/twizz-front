import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import Header from "../components/Header"
import UserDeck from "../components/UserDeck"
import BottomNav from "../components/BottomNav"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"
import UserContext from "../contexts/UserContext"

import { Main, Decks } from "../styles/userStyles"
import { Menu } from "../styles/homeStyles"

export default function Home() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [decks, setDecks] = useState([])
  const [totalDecks, setTotalDecks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    setLoading(true)
    const offset = 0

    const promiseTotal = deckRepository.getNumberOfDecks(user.token)
    promiseTotal
      .then(({ data }) => {
        setTotalDecks(data.totalDecks)
      })
      .catch((e) => {
        logout(e.response.data, navigate)
      })

    const promiseDecks = deckRepository.getAllDecks(offset, user.token)
    promiseDecks
      .then(({ data }) => {
        setDecks(data)
      })
      .catch((e) => {
        logout(e.response.data, navigate, user)
      })
      .finally(() => setLoading(false))
  }, [])

  function changePage(page) {
    setLoading(true)
    const offset = 10 * (page - 1)
    const promise = deckRepository.getAllDecks(offset, user.token)
    promise
      .then(({ data }) => {
        setDecks(data)
        setPage(page)
      })
      .catch((e) => {
        logout(e.response.data, navigate, user)
      })
      .finally(() => setLoading(false))
  }

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
            <>
              {decks.map((deck, i) => {
                return <UserDeck key={i} cardData={deck} />
              })}
              <BottomNav page={page} changePage={changePage} totalDecks={totalDecks} />
            </>
          ) : (
            <p className="notice">There are no decks yet</p>
          )}
        </Decks>
      </Main>
    </>
  )
}
