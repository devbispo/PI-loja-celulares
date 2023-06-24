import { createContext, useState } from 'react'
import { SignIn, logout } from '../services/AuthService'

const UserContext = createContext({
  userId: null,
  logado: false,
  SignIn: () => { },
  Logout: () => { },
})

export function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState({ userId: null, logado: true })

  async function handleLogin(email, password) {
    try {
      const id = await SignIn(email, password)
      setCurrentUser({ userId: id, logado: true })
    } catch (error) {
      throw Error(error.message)
    }
  }

  async function handleLogout() {
    await logout()
    setCurrentUser({ userId: null, logado: false })
  }

  const contexto = {
    userId: currentUser.userId,
    logado: currentUser.logado,
    handleLogin,
    handleLogout,
  }

  return (
    <UserContext.Provider value={contexto}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext