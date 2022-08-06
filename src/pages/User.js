import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import Header from "../components/Header"
import UserContext from "../contexts/UserContext"
import deckRepository from "../repositories/deckRepository"
import { logout } from "../services/logout"

export default function User() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [decks, setDecks] = useState([])

  useEffect(() => {
    const offset = 0
    const promise = deckRepository.getUserDecks(user.user.id, offset, user.token)
    promise
      .then(({ data }) => {
        setDecks(data)
      })
      .catch((e) => {
        console.log(e)
        logout(e.response.data, navigate)
      })
  }, [])

  return (
    <>
      <Header />
      <Main>
        <Create onClick={() => navigate("/creation")}>Create a new deck!</Create>
        <Decks></Decks>
      </Main>
    </>
  )
}

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    transition: all 0.3s;
  }
`

const Create = styled.button`
  width: 80%;
  height: 40px;
  margin: 20px;

  border-radius: 20px;
  border: none;
  outline: none;

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: var(--site-theme-dark);

  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;

  &:hover:enabled {
    background-color: var(--site-theme);
  }
`

const Decks = styled.section``
