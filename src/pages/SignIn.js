import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import UserContext from "../contexts/UserContext"

import authRepository from "../repositories/authRepository"
import { Main, Fail, StyledLink, Title, Auth } from "../styles/authStyles"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    }

    const promise = authRepository.signIn(data)
    promise.then(({ data }) => {
      setLoading(false)
      setUser(data)

      localStorage.setItem("twizz-user", JSON.stringify(data))

      navigate("/")
    })
    promise.catch((e) => {
      setError(true)
      setLoading(false)
      console.log(e)
    })
  }

  const inputs = [
    { ph: "Email", type: "email" },
    { ph: "Password", type: "password" },
  ]

  return (
    <Main>
      <Title>Twizz</Title>

      <Auth>
        <form onSubmit={(e) => handleSubmit(e)}>
          {inputs.map((i) => {
            return (
              <input
                key={i.ph}
                placeholder={i.ph}
                type={i.type}
                className={loading ? "loading" : ""}
                disabled={loading ? true : false}
                minLength={i.type === "password" ? "10" : "1"}
                required
              />
            )
          })}
          <button type="submit" className={loading ? "loading" : ""} disabled={loading ? true : false}>
            Sign In
          </button>
        </form>
        {error ? <Fail>Failed to Sign In...</Fail> : <></>}
        <StyledLink to="/sign-up">Don't have an account? Sign Up!</StyledLink>
      </Auth>
    </Main>
  )
}
