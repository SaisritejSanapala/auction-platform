import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config'

const Messages = () => {

  const [products, setProducts] = useState(null)


  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };



  const handleGetMessages = () => {

    axios.get(`${API_BASE_URL}/api/messages`, CONFIG_OBJ)
      .then(async (result) => {
        setProducts(result.data.result)


      })

      .catch((error) => { console.log(error) })

  }

  useEffect(() => {
    handleGetMessages()
  }, [])

  return (
    <div className='p-3'>
      {products !== null ?
        products.map((product) => {
   
          return (
            product.messages.map((msg) => {
              return (
                <div className='border mb-3 p-2' key={msg._id}>
                  <p className='fw-bold fs-1'>Message - {msg.messageText} </p>
                  <h4>Messaged By- {msg.messagedBy.fullName}, {msg.messagedBy.email}</h4>
                  <p>For product - Id: {product._id}, Title: {product.title}</p>
                </div>

              )

            }

            )

          )

        })
        :
        ""
      }
    </div>
  )
}

export default Messages