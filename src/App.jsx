import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './routes/Profile'
import Register from './routes/Register'
import VerifyEmail from './routes/VerifyEmail'
import Login from './routes/Login'
import { useState, useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { auth } from './firebase/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './private/PrivateRoute'

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false)

  //obtenemos y seteamos el usuario actual cuando se actualiza el componente. 
  //De esta manera al registrar un suario el currentUser va a tener la informacion del usuario registrado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route exact path='/' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Profile />
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Profile />
          } />
          <Route exact path='/verify-email' element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
