import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


 const Login = ({setLoginUser}) => {

    const navigate = useNavigate();

    const [user,setUser]=useState(
        {
            
            email:"",
            password:""
        }
    )
    const handleChange= (e)=>{
        
        const {name,value}=e.target;
  setUser((prev)=>{
      return {
          ...prev,
          [name]:value
      }
  })
    }
    const login=()=>{
        axios.post("http://localhost:9002/login",user).then((res)=>{
            if(res.data.status){
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.auth));
                alert("Login Successfuly")
                setLoginUser(res.data.user);
                navigate("/")
            }else{
                alert(res.data.message)
            }
        })
    }
  return (
    <div className='container'>
  

        <div className='login_component'>
        <h2 className='text-center custom_heading '>
          Login
      </h2>
      <div className='form-group'>
          <label>Email</label>
          <input type='email' className='form-control' name='email' value={user.email}  onChange={handleChange}  />
      </div>
      <div className='form-group mt-3'>
          <label>Password</label>
          <input type='password' className='form-control' name='password' value={user.password}  onChange={handleChange} />
      </div>
      <div className='mt-3 btn-loginn '>
          <button className='btn' onClick={login}>
              Login
          </button>
        {/* <span>OR</span>
          <button className='btn' onClick={()=>{
              navigate('/register')
          }}>
             Register
          </button> */}
      </div>

        </div>
    </div>
  )
}
export default Login
