import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import Signup from "./components/auth/Signup/Signup";
import Splash from "./components/Splash/Splash";
import CurrentUserProvider from "./context/CurrentUserContext";
import AuthRoute from "./components/auth/AuthRoute/AuthRoute";
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


  const storedUser: string | null = localStorage.getItem('currentUser')
  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(storedUser ? JSON.parse(storedUser!).isLoggedIn : false)

  // axios.defaults.withCredentials = true
  // // Authenticates the token in order to provide access to protected routes
  useEffect(() => {
    const token = JSON.parse(storedUser!)?.token || ''
    axios.get('/api/auth/currentUser', {
        headers: {
            Authorization: token
        }
    }).then(response => {
      setIsLoggedIn(true)
    }).catch(error => {
      setIsLoggedIn(false)
    })
  },[])

  return (
    <div className="App h-[100vh] dark:bg-bgDarkMode">
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
