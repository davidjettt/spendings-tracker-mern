import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Charts from "../Charts/Charts";
import TransactionForm from "../Transactions/TransactionForm";
export interface IAppProps {
}

export default function Protected (props: IAppProps) {
    const { currentUser } = useContext(CurrentUserContext)
    let navigate = useNavigate()
    const [ user ] = useState({
        id: localStorage.getItem('id'),
        email: localStorage.getItem('email')
    })

    const [ loadPage, setLoadPage ] = useState<boolean>(false)

    console.log('user', currentUser)

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
            navigate('/')
        })
    },[])

    const handleLogout = (): void => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('id')
        // console.log('axios header', axios.defaults.headers.common['Authorization'])
        // delete axios.defaults.headers.common['Authorization']
        navigate('/')
    }

  return (
    <>
        {loadPage && <div>
            <h1>Protected</h1>
            <h2>{user.id}</h2>
            <h2>{user.email}</h2>
            <TransactionForm />
            <Charts />
            <button onClick={handleLogout}>Logout</button>
        </div>}
    </>
  );
}
