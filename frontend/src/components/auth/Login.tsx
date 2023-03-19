import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { IAxiosError } from "../../interfaces/IAxiosError";
import { useCurrentUser } from "../../context/CurrentUserContext";

interface ILoginCredentials {
    email: string,
    password: string
}

interface ILoginProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Login ({ isLoggedIn, setIsLoggedIn }: ILoginProps) {
    let navigate = useNavigate()
    const { setCurrentUser } = useCurrentUser()
    const [ loadPage, setLoadPage ] = useState<boolean>(false)
    const [ loginCredentials, setLoginCredentials ] = useState<ILoginCredentials>({email: '', password: ''})
    const [ errors, setErrors ] = useState<string[]>([])

    // checks if token in local storage is a valid token
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     axios.get('/api/auth/currentUser', {
    //         headers: {
    //             Authorization: token
    //         }
    //     }).then(res => {
    //         navigate('/dashboard')
    //     }).catch(err => {
    //         setLoadPage(true)
    //     })
    // },[navigate])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault()

        axios.post('/api/auth/login', loginCredentials)
        .then((response) =>{
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('id', response.data.id)
            setCurrentUser(response.data)
            setIsLoggedIn(true)
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
 {!isLoggedIn ?
        <div>
            {errors && <div>
                {errors.map((err: string, idx: number) => (
                    <div key={idx}>
                        {err}
                    </div>
                ))}
            </div>}

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
                </form>
        </div> : <Navigate to='/dashboard' replace />}
    </>
  );
}
