import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';



const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const buttonClicked = () => {
    dispatch({ type: "CLICKED", payload: true })

  }



  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "LOGIN_ERROR" })
    navigate('/', { replace: true })
    window.location.href = "/"

  }


  return (
    <nav className='d-flex justify-content-between bg-black p-2'>
      <NavLink className='text-white fs-5 ' style={{ textDecoration: 'none' }}>Zielger</NavLink>

      {user ? "" :
        <div className='d-flex'>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Seller
            </button>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/sellerlogin">Login</NavLink></li>
              <li><NavLink className="dropdown-item" to="/sellersignup">Signup</NavLink></li>

            </ul>
          </div>


          <div className="dropdown ms-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Customer
            </button>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/customerlogin">Login</NavLink></li>
              <li><NavLink className="dropdown-item" to="/customersignup">Signup</NavLink></li>

            </ul>
          </div>
        </div>}

      {user && user.type === "seller" ? (
        <div>
          <Button variant="primary" onClick={() => buttonClicked()}>
            Add Product
          </Button>
          <button className='btn btn-danger ms-3' onClick={logout}>Logout</button>
        </div>
      )
        :
        (user ?
          <>
            <form className="d-flex" role="search" >
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" >Search</button>
            </form>
            <button className='btn btn-danger ' onClick={logout}>Logout</button>
          </>

          : "")
      }


    </nav>
  )
}

export default Navbar