import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const Navbar = ({setLoginUser}) => {

  const navigate = useNavigate();

  const clearLocalstorage = () => {
    localStorage.clear();
    navigate("/login");
  }

  return (
      <nav className="navbar navbar-expand-lg bg-light">
    <div className="container">
      <NavLink to="/" className="navbar-brand navv" ><img src="/images/cargo.png" /></NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
        <i className="fa-solid fa-sliders"></i>
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link active" aria-current="page" href="#">Associates</NavLink>
          </li>
          
          { JSON.parse(localStorage.getItem("token")) ? (
            <li>
              <a className="nav-link" onClick={clearLocalstorage}>Log out</a>
          </li>
          ):(
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
            </li>
          )
            
          }
        </ul>
       
        
       
      </div>
    
    </div>
  </nav>
  )
}
export default Navbar
