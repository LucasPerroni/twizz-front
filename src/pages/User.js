import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Header from "../components/Header"
import UserDeck from "../components/UserDeck"
import UserContext from "../contexts/UserContext"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"

import { Main, Create, Decks } from "../styles/userStyles"

export default function User() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const { id: profileId } = useParams()
  const [loading, setLoading] = useState(true)
  const [decks, setDecks] = useState([])
  const [refreshPage, setRefreshPage] = useState(false)

  useEffect(() => {
    setLoading(true)
    const offset = 0
    const promise = deckRepository.getUserDecks(profileId, offset, user.token)
    promise
      .then(({ data }) => {
        setDecks(data)
      })
      .catch((e) => {
        logout(e.response.data, navigate)
      })
      .finally(() => setLoading(false))
  }, [refreshPage])

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
            decks.map((deck, i) => {
              return (
                <UserDeck key={i} cardData={deck} refreshPage={refreshPage} setRefreshPage={setRefreshPage} />
              )
            })
          ) : (
            <p className="notice">This user don't have any decks</p>
          )}
        </Decks>
      </Main>
    </>
  )
}
