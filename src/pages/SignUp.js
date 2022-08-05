import { useState } from "react"
import { useNavigate } from "react-router-dom"

import authRepository from "../repositories/authRepository"
import { Main, Fail, StyledLink, Title, Auth } from "../styles/authStyles"

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      image: e.target[2].value,
      password: e.target[3].value,
    }

    const promise = authRepository.createUser(data)
    promise.then((response) => {
      setLoading(false)
      navigate("/sign-in")
    })
    promise.catch((e) => {
      setError(true)
      setLoading(false)
      console.log(e)
    })
  }

  const inputs = [
    { ph: "Name", type: "text" },
    { ph: "Email", type: "email" },
    { ph: "Image", type: "url" },
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
            Sign Up
          </button>
        </form>
        {error ? <Fail>Failed to Sign Up...</Fail> : <></>}
        <StyledLink to="/sign-in">Already have an account? Sign In!</StyledLink>
      </Auth>
    </Main>
  )
}
