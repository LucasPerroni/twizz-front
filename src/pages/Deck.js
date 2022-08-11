import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"

import Header from "../components/Header"
import Card from "../components/Card"
import Footer from "../components/Footer"
import { Main } from "../styles/userStyles"
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
  const [finalStatus, setFinalStatus] = useState("")
  const [resetDeck, setResetDeck] = useState(false)

  useEffect(() => {
    const promise = deckRepository.getDeckById(id, user.token)
    promise
      .then(({ data }) => {
        setDeck(data)
        shuffleArray(data.Questions)
      })
      .catch((e) => {
        logout(e.response.data, navigate, user)
      })
  }, [resetDeck])

  function restartDeck() {
    setDeck({})
    setProgress({ correct: 0, icons: [] })
    setFinalStatus("")
    setResetDeck(!resetDeck)
  }

  return (
    <>
      <Header />
      <Main className={finalStatus === "" ? "has-footer" : "footer-finished"}>
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
      <Footer
        finalStatus={finalStatus}
        setFinalStatus={setFinalStatus}
        progress={progress}
        deck={deck}
        restartDeck={restartDeck}
      />
    </>
  )
}
