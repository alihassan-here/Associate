import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            password: "",
            reEnterPassword: ""
        }
    )
    const handleChange = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    const register = () => {
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password == reEnterPassword)) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/register`, user).then((res) => {

                if (res.data.status) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem("token", JSON.stringify(res.data.auth));
                    alert(res.data.message);
                    navigate('/login')
                }
            })
        }
        else {
            alert("fill in fields")
        }

    }
    return (
        <div className='container'>


            <div className='login_component'>

                <h2 className='text-center custom_heading '>
                    Register
                </h2>
                { }
                <div className='form-group'>
                    <label>Name</label>
                    <input type='text' name="name" value={user.name} className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label>Email</label>
                    <input type='email' name="email" value={user.email} className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label>Password</label>
                    <input type='password' name="password" value={user.password} className='form-control' onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label>Re-enter Password</label>
                    <input type='password' name="reEnterPassword" value={user.reEnterPassword} className='form-control' onChange={handleChange} />
                </div>
                <div className='mt-3 btn-loginn '>

                    <button className='btn' onClick={register}>
                        Register
                    </button>
                    <span>Or</span>
                    <button className='btn' onClick={() => {
                        navigate("/login")
                    }}>
                        Login
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Register;