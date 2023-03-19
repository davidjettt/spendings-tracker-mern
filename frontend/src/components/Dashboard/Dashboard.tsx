import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Charts from "../Charts/Charts";
import TransactionsList from "../Transactions/TransactionsList";
import TransactionForm from "../Transactions/TransactionForm";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import ChartLegend from "../Charts/ChartLegend";


interface IDashboardProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dashboard ({ setIsLoggedIn }: IDashboardProps) {
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
            setLoadPage(true)
        }).catch(err => {
            console.error('err', err)
            // Redirect user back to login page
            navigate('/')
        })
    },[])

  return (
    <div
        className="dashboard-main-container flex h-[100%] overflow-hidden"
    >
      <NavBar setIsLoggedIn={setIsLoggedIn} />
        {loadPage &&
            <div
                className="dashboard w-[95%]"
            >
                <h1>Month/Year dropdown goes here</h1>
                {/* <h2>{user.id}</h2>
                <h2>{user.email}</h2> */}
                <Charts />
                {/* <ChartLegend /> */}
                <TransactionsList />
            </div>
        }
    </div>
  );
}
