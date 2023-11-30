import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'


const Signup = (props) => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

  

    const handleSubmit =  (e) => {

        e.preventDefault()
        setLoading(true);

        axios.post(`${API_BASE_URL}/api/auth/${props.type}/signup`, { fullName, email, password })
            .then((response) => {
        
                setLoading(false)
                navigate(`/${props.type}login`)

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

            <h1>Signup</h1>

            <div className="mb-3">
                <label for="fullname" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="fullname" value={fullName} onChange={(e) => { setFullName(e.target.value) }} />

            </div>


            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => { setEmail(e.target.value) }} />

            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Signup