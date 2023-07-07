import { createContext, useState } from 'react'
import { SignIn, Logout } from '../services/AuthServices'
const UserContext = createContext({
  userId: null,
  logado: false,
  SignIn: () => { },
  logout: () => { },
})

export function UserContextProvider(props) {

  const [currentUser, setCurrentUser] = useState({ userId: null, logado: true })

  async function handleLogin(email, password) {
    try {
      const id = await SignIn(email, password);
      setCurrentUser({ userId: id, logado: true, email: email }); // Atualize o valor do email ao fazer o login
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function handleLogout() {
    await Logout()
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