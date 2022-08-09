import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import Header from "../components/Header"
import Card from "../components/Card"
import { Main } from "../styles/userStyles"
import { Footer } from "../styles/deckStyles"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"
import shuffleArray from "../services/shuffleArray"

import UserContext from "../contexts/UserContext"

export default function Deck() {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [deck, setDeck] = useState({})
  const [progress, setProgress] = useState({ correct: 0, icons: [] })

  useEffect(() => {
    const promise = deckRepository.getDeckById(id, user.token)
    promise
      .then(({ data }) => {
        setDeck(data)
        shuffleArray(data.Questions)
      })
      .catch((e) => {
        logout(e.response.data, navigate)
      })
  }, [])

  return (
    <>
      <Header />
      <Main className="has-footer">
        {deck.name ? (
          <>
            <h1>{deck.name}</h1>
            {deck.Questions.map((question, i) => (
              <Card
                key={question.id}
                question={question}
                questionNumber={i + 1}
                progress={progress}
                setProgress={setProgress}
              />
            ))}
          </>
        ) : (
          <p className="notice">Loading deck...</p>
        )}
      </Main>
      <Footer>
        <div>{progress.icons.map((icon) => icon)}</div>
      </Footer>
    </>
  )
}
