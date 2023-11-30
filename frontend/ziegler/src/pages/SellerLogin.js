import React from 'react'
import Login from '../components/Login'

const SellerLogin = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ marginTop: 100 + "px"}}>
      <Login type="seller" />
    </div>
  )
}

export default SellerLogin