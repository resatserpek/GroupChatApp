import React, { useState, useEffect, useContext, createContext } from 'react'
import { auth, onAuthStateChanged } from '../firebase'

export const AuthContext = createContext()

export const AuthContextProvider = props => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}