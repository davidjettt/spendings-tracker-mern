import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface IAppProps {
}

export default function Protected (props: IAppProps) {
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
            navigate('/login')
        })
    },[])

    const handleLogout = (): void => {
        localStorage.removeItem('token')
        // console.log('axios header', axios.defaults.headers.common['Authorization'])
        // delete axios.defaults.headers.common['Authorization']
        navigate('/login')
    }

  return (
    <>
        {loadPage && <div>
            <h1>Protected</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>}
    </>
  );
}
