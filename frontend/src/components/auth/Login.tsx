import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IAxiosError } from "../../interfaces/IAxiosError";
import { useCurrentUser } from "../../context/CurrentUserContext";

interface ILoginCredentials {
    email: string,
    password: string
}

export default function Login () {
    let navigate = useNavigate()

    const { currentUser, setCurrentUser } = useCurrentUser()

    const [ loadPage, setLoadPage ] = useState<boolean>(false)
    const [ loginCredentials, setLoginCredentials ] = useState<ILoginCredentials>({email: '', password: ''})
    const [ errors, setErrors ] = useState<string[]>([])

    // checks if token in local storage is a valid token
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/api/auth/currentUser', {
            headers: {
                Authorization: token
            }
        }).then(res => {
            navigate('/protected')
        }).catch(err => {
            console.log('err', err)
            setLoadPage(true)
        })
    },[])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault()

        axios.post('/api/auth/login', loginCredentials)
            .then((user) =>{
                localStorage.setItem('token', user.data.token)
                localStorage.setItem('email', user.data.email)
                localStorage.setItem('id', user.data.id)
                setCurrentUser(user.data)
                navigate('/protected')
            })
            .catch((err: IAxiosError) => {
                setErrors([...err.response.data.errors])
            })
    }

  return (
    <>
        {errors && <div>
            {errors.map((err: string, idx: number) => (
                <div key={idx}>
                    {err}
                </div>
            ))}
        </div>}
        {loadPage && <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Email'
                value={loginCredentials.email || ''}
                onChange={handleInputChange}
                name='email'
            />
            <input
                type='password'
                placeholder='Password'
                value={loginCredentials.password || ''}
                onChange={handleInputChange}
                name='password'
            />
            <button>Login</button>
        </form>}
    </>
  );
}
