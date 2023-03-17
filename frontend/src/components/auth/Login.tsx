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

    const { setCurrentUser } = useCurrentUser()

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
            navigate('/dashboard')
        }).catch(err => {
            setLoadPage(true)
        })
    },[navigate])

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
            navigate('/dashboard')
        })
        .catch((err: IAxiosError) => {
            setErrors([...err.response.data.errors])
        })
    }

    const handleDemoLogin = (): void => {
        setLoginCredentials({
            email: 'demo@aa.io',
            password: 'benjaminbutton123'
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
        {loadPage &&
            <form
                className="flex flex-col"
                onSubmit={handleSubmit}
            >
                <input
                    className="shadow appearance-none border rounded focus:outline-none"
                    type='text'
                    placeholder='Email'
                    value={loginCredentials.email || ''}
                    onChange={handleInputChange}
                    name='email'
                />
                <input
                    className="border rounded"
                    type='password'
                    placeholder='Password'
                    value={loginCredentials.password || ''}
                    onChange={handleInputChange}
                    name='password'
                />
                <button
                    className="border rounded px-2"
                >
                    Login
                </button>
                <button
                    className="border rounded px-2"
                    onClick={handleDemoLogin}
                >
                    Demo Login
                </button>
            </form>}
    </>
  );
}
