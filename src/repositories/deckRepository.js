import api from "../services/api"

const config = (token) => {
  return { headers: { authorization: `Bearer ${token}` } }
}

function getUserDecks(userId, offset, token) {
  const promise = api.get(`/decks/user/${userId}/${offset}`, config(token))
  return promise
}

function getAllDecks(offset, token) {
  const promise = api.get(`/decks/all/${offset}`, config(token))
  return promise
}

function getDeckById(id, token) {
  const promise = api.get(`/deck/${id}`, config(token))
  return promise
}

function getNumberOfDecks(token) {
  const promise = api.get(`/decks/number`, config(token))
  return promise
}

function getNumberOfDecksOfUser(userId, token) {
  const promise = api.get(`/decks/number/${userId}`, config(token))
  return promise
}

function createDeck(data, token) {
  const promise = api.post("/deck", data, config(token))
  return promise
}

const deckRepository = {
  getUserDecks,
  getAllDecks,
  getDeckById,
  createDeck,
  getNumberOfDecks,
  getNumberOfDecksOfUser,
}

export default deckRepository
