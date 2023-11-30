import React from 'react'
import Signup from '../components/Signup'

const CustomerSignup = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ marginTop: 100 + "px"}}>
      <Signup type="customer" />
    </div>
  )
}

export default CustomerSignup