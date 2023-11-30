import React from 'react'
import Login from '../components/Login'

const CustomerLogin = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ marginTop: 100 + "px"}}>
    <Login type="customer" />
  </div>
  )
}

export default CustomerLogin