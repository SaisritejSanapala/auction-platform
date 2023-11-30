import React from 'react'
import Signup from '../components/Signup'

const SellerSignup = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ marginTop: 100 + "px"}}>
      <Signup type="seller" />
    </div>
  )
}

export default SellerSignup