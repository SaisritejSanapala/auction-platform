import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom'
import Loading from './Loading';


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`${API_BASE_URL}/api/auth/${props.type}/login`, { email, password })
            .then((response) => {
                
                localStorage.setItem("token", response.data.result.token)
                localStorage.setItem("user", JSON.stringify(response.data.result.user))
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.result.user });
                setLoading(false)
                if (props.type === "seller") {
                    navigate('/sellerprofile')
                }
                else {
                    navigate('/auctioninterface')
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                alert(error.response.data.error)
            })
    }

    return (

        <form onSubmit={(e) => handleSubmit(e)}>


            {loading ? <Loading /> : ""}


            <h1>Login</h1>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login