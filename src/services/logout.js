export function logout(message, navigate, user) {
  window.localStorage.clear()
  navigate("/sign-in")

  if (message === "Token has expired" && user.token) {
    alert("Token has expired")
  }
}
