import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../components/Header"
import questionNumber from "../components/questionNumber"
import UserContext from "../contexts/UserContext"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"
import { Main, Form, Title } from "../styles/creationStyles"

export default function Creation() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [number, setNumber] = useState(0)
  const [refreshNum, setRefreshNum] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [dataQuestions, setDataQuestions] = useState([])

  useEffect(() => {
    questionNumber().then((response) => {
      if (response <= 0) {
        setRefreshNum(!refreshNum)
      } else {
        setNumber(response)
      }
    })
  }, [refreshNum])

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = createBody(e, number)
    setDataQuestions(data.questions)

    const promise = deckRepository.createDeck(data, user.token)
    promise
      .then((response) => {
        navigate(`/user/${user.user.id}`)
      })
      .catch((e) => {
        setError(true)
        logout(e.response.data, navigate)
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Header />
      <Main>
        <button
          onClick={() => setRefreshNum(!refreshNum)}
          className={loading ? "loading" : ""}
          disabled={loading ? true : false}
        >
          Number of questions
        </button>
        <span />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Title>Deck Info</Title>
          <input
            placeholder="Title"
            type="text"
            className={loading ? "loading" : ""}
            disabled={loading ? true : false}
            required
          />
          <textarea
            placeholder="Description"
            className={loading ? "loading" : ""}
            disabled={loading ? true : false}
          />
          <span />
          <QuestionList number={number} loading={loading} dataQuestions={dataQuestions} />
          <button type="confirm" className={loading ? "loading" : ""} disabled={loading ? true : false}>
            Confirm
          </button>
        </Form>
        {error ? <p>Failed do create a new deck...</p> : <></>}
      </Main>
    </>
  )
}

function QuestionList({ number, loading, dataQuestions }) {
  const arr = []
  const inputs = [
    { ph: "Question", type: "text", state: "question" },
    { ph: "Answer", type: "text", state: "answer" },
    { ph: "Image", type: "url", state: "image" },
  ]
  for (let i = 0; i < number; i++) {
    arr.push(
      <article key={i}>
        <Title>Question {i + 1}</Title>
        {inputs.map((input) => {
          return (
            <input
              key={input.ph}
              placeholder={input.ph}
              type={input.type}
              className={loading ? "loading" : ""}
              disabled={loading ? true : false}
              required={input.ph !== "Image" ? true : false}
              defaultValue={dataQuestions[i] ? dataQuestions[i][input.state] : ""}
            />
          )
        })}
        <span />
      </article>
    )
  }
  return <>{arr.map((q) => q)}</>
}

function createBody(e, questionNumber) {
  const body = {
    name: e.target[0].value,
    questions: [],
  }
  let description = e.target[1].value
  if (description) {
    body.description = description
  }

  for (let i = 0; i < questionNumber; i++) {
    const skip = 2 * i + i

    const questionInfo = {
      question: e.target[2 + skip].value,
      answer: e.target[3 + skip].value,
    }
    let image = e.target[4 + skip].value
    if (image) {
      questionInfo.image = image
    }

    body.questions.push(questionInfo)
  }

  return body
}
