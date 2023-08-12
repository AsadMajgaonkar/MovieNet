import { logoutUser } from "../services/authService"

const Logout = () => {
  logoutUser();
  window.location = '/'
  return null
}

export default Logout