import api from "../services/api"

function createUser(data) {
  const promise = api.post("/sign-up", data)
  return promise
}

function signIn(data) {
  const promise = api.post("/sign-in", data)
  return promise
}

const authRepository = {
  createUser,
  signIn,
}

export default authRepository
