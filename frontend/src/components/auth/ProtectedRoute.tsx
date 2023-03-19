import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export interface IProtectedRouteProps {
    children: JSX.Element,
    isLoggedIn: boolean
}

export default function ProtectedRoute (props: IProtectedRouteProps) {
    const [ loadPage, setLoadPage ] = useState<boolean>(false)
    let location = useLocation()

    if (!props.isLoggedIn) {
        return <Navigate to='/' state={{ from: location }} replace />
    }
  return props.children
}
