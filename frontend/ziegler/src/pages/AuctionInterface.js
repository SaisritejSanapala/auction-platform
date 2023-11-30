import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AuctionInterface.css'

const AuctionInterface = () => {
  const [products, setProducts] = useState([]);
  const [biddingProduct, setBiddingProduct] = useState([])
  const [bidAmount, setBidAmount] = useState("")
  const [message, setMessage] = useState("")

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };

  const handleBid = () => {

    axios.put(`${API_BASE_URL}/api/bid/${biddingProduct._id}`, {}, CONFIG_OBJ)
      .then((result) => {
        console.log(result)
        setBidAmount("")
        handleClose()
      })
      .catch((error) => { console.log(error) })
  }


  const contactSeller = () => {
    axios.post(`${API_BASE_URL}/api/contactseller/${biddingProduct._id}`, { message }, CONFIG_OBJ)
      .then((result) => {
        console.log(result)
        setMessage("")
        alert('Message sent')

      })
      .catch((error) => { console.log(error) })
  }


  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/allproducts`)
      .then((response) => {
        setProducts(response.data.result)
        console.log(response)
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);


  return (
    <div>
      <div className='p-2'>
        <h3>Available Products</h3>
        <ul>
          <div className='d-flex flex-wrap mt-3 card-container'>
            {products.map(product => (

              <li key={product.id} style={{ listStyleType: "none", cursor: "pointer" }} className=' me-3 mb-3 card' onClick={() => { handleShow(); setBiddingProduct(product) }}>
                <div className=''>
                  <img src={product.image} alt={product.title} style={{ height: 250 + "px", width: 200 + "px" }} />
                  <div className='p-2'>
                    <h4>{product.title} </h4>
                    <p >{product.description}</p>
                    <p className='fw-bold'>{product.price} ₹</p>
                  </div>

                </div>
              </li>

            ))}
          </div>
        </ul>
      </div>


      <>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Interested?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={biddingProduct.image} className='w-100' alt={biddingProduct.title} />
            <h1>{biddingProduct.title}</h1>
            <p>{biddingProduct.description}</p>
            <p className='fw-bold'>{biddingProduct.price} ₹</p>
            <div style={{ cursor: "pointer" }} >

              <div className="form-floating">
                <textarea className="form-control" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                <label for="floatingTextarea"><i className="fa-regular fa-message"> Contact Seller</i></label>
                <button className='btn btn-primary mt-2' onClick={contactSeller}>Submit</button>
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleBid}>
              Bid
            </Button>
          </Modal.Footer>
        </Modal>
      </>


    </div>
  );
};

export default AuctionInterface;
