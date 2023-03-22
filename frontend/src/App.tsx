import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Splash from "./components/Splash/Splash";
import CurrentUserProvider from "./context/CurrentUserContext";
import NavBar from "./components/NavBar/NavBar";
import AuthRoute from "./components/auth/AuthRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "./context/ThemeContext";


function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('/api/auth/currentUser', {
        headers: {
            Authorization: token
        }
    }).then(res => {
      setIsLoggedIn(true)
    }).catch(err => {
      setIsLoggedIn(false)
    })
},[])

  return (
    <div className="App h-[100vh]">
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <ThemeProvider>
          <CurrentUserProvider>
            <BrowserRouter>
              {/* {showNavBar && <NavBar setShowNavBar={setShowNavBar} />} */}
              <Routes>
                <Route path='/' element={<Splash isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path='/signup' element={
                  <AuthRoute isLoggedIn={isLoggedIn}>
                    <Signup />
                  </AuthRoute>
                }
                />
                <Route path='/dashboard' element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                  </ProtectedRoute>
                }
                />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </BrowserRouter>
          </CurrentUserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
