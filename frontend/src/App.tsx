import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./components/auth/Signup";
import Splash from "./components/Splash/Splash";
import CurrentUserProvider, { useCurrentUser } from "./context/CurrentUserContext";
import AuthRoute from "./components/auth/AuthRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ThemeProvider from "./context/ThemeContext";


function App() {
  // Initializes new instance of Query client for the entire app
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

  // // Authenticates the token in order to provide access to protected routes
  useEffect(() => {
    console.log('APP MOUNTED')
    // console.log(currentUser)
    const token = localStorage.getItem('token')
    axios.get('/api/auth/currentUser', {
        headers: {
            Authorization: token
        }
    }).then(res => {
      console.log('VALID')
      setIsLoggedIn(true)
    }).catch(err => {
      console.log('CATCH')
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
              <Routes>
                <Route path='/' element={
                  <AuthRoute isLoggedIn={isLoggedIn}>
                    <Splash setIsLoggedIn={setIsLoggedIn} />
                  </AuthRoute>
                }/>
                <Route path='/signup' element={
                  <AuthRoute isLoggedIn={isLoggedIn}>
                    <Signup setIsLoggedIn={setIsLoggedIn} />
                  </AuthRoute>
                }
                />
                <Route path='/dashboard' element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard setIsLoggedIn={setIsLoggedIn} />
                  </ProtectedRoute>
                }
                />
                {/* <Route path='/' element={<Splash setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn} />} /> */}
                {/* <Route path='/dashboard' element={<ProtectedRoute isLoggedIn={isLoggedIn} redirectedPath='/login' outlet={<Dashboard setIsLoggedIn={setIsLoggedIn} />} />} /> */}
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
