import { useState, useEffect } from 'react'
import { redirect, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

export interface IProtectedRouteProps {
    children: any
}

export default function ProtectedRoute (props: IProtectedRouteProps) {
    let navigate = useNavigate()
    const [ loadPage, setLoadPage ] = useState<boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/api/auth/currentUser', {
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log('res', res)
            setLoadPage(true)
        }).catch(err => {
            console.log('err', err)
            // Redirect user back to login page
            // navigate('/')
        })
    },[])

  return (
    <Route {...props}>
        {(loadPage) ? props!.children : redirect('/')}
    </Route>
  );
}
