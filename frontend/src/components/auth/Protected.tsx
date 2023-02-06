import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface IAppProps {
}

export default function Protected (props: IAppProps) {
    let navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/api/auth/currentUser', {
            headers: {
                Authorization: token
            }
        }).then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log('err', err)
            // Redirect user back to login page
            navigate('/login')
        })
    },[])

  return (
    <div>
        <h1>Protected</h1>
    </div>
  );
}
