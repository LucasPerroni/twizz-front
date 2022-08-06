export function logout(message, navigate) {
  if (message === "Token has expired") {
    alert("Token has expired")
    window.localStorage.clear()
    navigate("/sign-in")
  }
}
