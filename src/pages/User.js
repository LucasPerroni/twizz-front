import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Header from "../components/Header"
import UserDeck from "../components/UserDeck"
import BottomNav from "../components/BottomNav"
import UserContext from "../contexts/UserContext"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"

import { Main, Create, Decks } from "../styles/userStyles"

export default function User() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { id: profileId } = useParams()

  const [decks, setDecks] = useState([])
  const [totalDecks, setTotalDecks] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [refreshPage, setRefreshPage] = useState(false)

  useEffect(() => {
    setLoading(true)
    const offset = 0

    const promiseTotal = deckRepository.getNumberOfDecksOfUser(profileId, user.token)
    promiseTotal
      .then(({ data }) => {
        setTotalDecks(data.totalDecks)
      })
      .catch((e) => {
        logout(e.response.data, navigate)
      })

    const promiseDecks = deckRepository.getUserDecks(profileId, offset, user.token)
    promiseDecks
      .then(({ data }) => {
        setDecks(data)
      })
      .catch((e) => {
        logout(e.response.data, navigate, user)
      })
      .finally(() => setLoading(false))
  }, [refreshPage])

  function changePage(page) {
    setLoading(true)
    const offset = 10 * (page - 1)
    const promise = deckRepository.getUserDecks(profileId, offset, user.token)
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
      <Header refreshUserPage={refreshPage} setRefreshUserPage={setRefreshPage} />
      <Main>
        {user.user.id === Number(profileId) ? (
          <Create onClick={() => navigate("/creation")}>Create a new deck!</Create>
        ) : loading ? (
          <></>
        ) : decks[0] ? (
          <h1>{decks[0].user.name}</h1>
        ) : (
          <></>
        )}

        <Decks>
          {loading ? (
            <p className="notice">Loading decks...</p>
          ) : decks.length > 0 ? (
            <>
              {decks.map((deck, i) => {
                return (
                  <UserDeck
                    key={i}
                    cardData={deck}
                    refreshPage={refreshPage}
                    setRefreshPage={setRefreshPage}
                  />
                )
              })}
              <BottomNav page={page} changePage={changePage} totalDecks={totalDecks} />
            </>
          ) : (
            <p className="notice">This user don't have any decks</p>
          )}
        </Decks>
      </Main>
    </>
  )
}
