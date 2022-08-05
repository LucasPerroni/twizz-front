import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import UserContext from "../contexts/UserContext"

export default function Home() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user.token) {
      navigate("/sign-in")
    }
  }, [])

  return (
    <Main>
      <p>Home Page</p>
    </Main>
  )
}

const Main = styled.main``
