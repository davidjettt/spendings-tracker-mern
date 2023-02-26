import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Charts from "../Charts/Charts";
import TransactionsList from "../Transactions/TransactionsList";
import TransactionForm from "../Transactions/TransactionForm";
import { Link } from "react-router-dom";
export interface IAppProps {
}

export default function Dashboard (props: IAppProps) {
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

  return (
    <>
        {loadPage && <div>
            <h1>Dashboard</h1>
            {/* <h2>{user.id}</h2>
            <h2>{user.email}</h2> */}
            <Charts />
            <TransactionsList />
        </div>}
    </>
  );
}
