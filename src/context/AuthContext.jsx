import React, {useContext} from 'react'

const AuthContext = React.createContext()

//Nos permite compartie el valor de estado del usuario
//hacia todos los hijos del AuthContext.Provider
export function AuthProvider({children, value}) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

//Nos permite acceder al valor pasado a AuthContext.Provider
export function useAuthValue(){
  return useContext(AuthContext)
}