import axios from 'axios'
import {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'

interface IAuthRouteProps {
    children: JSX.Element,
    isLoggedIn: boolean
}

export default function AuthRoute (props: IAuthRouteProps) {
    const [isLoggedIn2, setIsLoggedIn2] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/api/auth/currentUser', {
            headers: {
                Authorization: token
            }
            }).then(res => {
            setIsLoggedIn2(true)
            }).catch(err => {
            setIsLoggedIn2(false)
        })
    },[])

  if (isLoggedIn2) {
    return <Navigate to='/dashboard' replace />
  }
  return props.children
}
