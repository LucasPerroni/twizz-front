import api from "../services/api"

const config = (token) => {
  return { headers: { authorization: `Bearer ${token}` } }
}

function getUserDecks(userId, offset, token) {
  const promise = api.get(`/decks/user/${userId}/${offset}`, config(token))
  return promise
}

function createDeck(data, token) {
  const promise = api.post("/deck", data, config(token))
  return promise
}

const deckRepository = {
  getUserDecks,
  createDeck,
}

export default deckRepository
