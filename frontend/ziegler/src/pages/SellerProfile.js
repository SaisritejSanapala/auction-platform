import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Product from '../components/Product';
import './SellerProfile.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const SellerProfile = () => {

  const value = useSelector(state => state.addProductReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [data, setData] = useState(null);

  const [image, setImage] = useState({ preview: '', data: '' })
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")


  const handleClose = () => {
    dispatch({ type: "CLOSE", payload: false });

  }


  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  };


  const getAllProducts = () => {
    axios.get(`${API_BASE_URL}/api/getmyallproducts`, CONFIG_OBJ)
      .then((result) => {
        console.log(result);
        setData(result.data.result);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage({
          preview: reader.result,
          data: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };


  const addProduct = () => {

    axios.post(`${API_BASE_URL}/api/addproduct`, { image: image.preview, title, description, price }, CONFIG_OBJ,)
      .then((result) => {
        console.log(result);
        handleClose();
        getAllProducts();
        setDescription("")
        setTitle("")
        setImage({ preview: "", data: "" })
        setPrice("")
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error)
      });
  };

  var msgsCount = 0

  const messagesClicked = () => {
    navigate('/messages')
  }

  useEffect(() => {

    getAllProducts();

  }, []);

  return (

    <>
      <div>

        <div className='container d-flex flex-wrap p-3 product-container'>

          {data === null ? <p>...loading</p> :
            data.map((product) => {
              msgsCount += product.messages.length
              return (
                <div key={product._id}>
               
                  <Product product={product} key={product._id} getAllProducts={getAllProducts} />
                </div>


              )
            }

            )
          }

          <>
            <Modal show={value.value} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <label htmlFor='image'>Image: </label> <br />
                  <input name="file" type="file" id="image" className="FileUpload mb-3" accept=".jpg,.png,.gif" onChange={handleFileSelect} /><br />
                  {image.preview && <img src={image.preview} alt="..." className='w-100 mb-3' />}
                  <label htmlFor='title'>Title: </label>
                  <input type="text" className='form-control mb-3' id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                  <label htmlFor='description'>Description: </label>
                  <input type="text" className='form-control' id='description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                  <label htmlFor='price'>Price: </label>
                  <input type='number' className='form-control' id='price' value={price} onChange={(e) => { setPrice(e.target.value) }} />

                </div>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={addProduct}>
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </>

        </div>

        <div className='position-fixed bottom-0 end-0 p-3 ' style={{ cursor: 'pointer' }} onClick={messagesClicked}>
          <i className="fa-regular fa-message fs-1 text-primary"><sup className='fs-6 text-warning'>{msgsCount }</sup></i>
        </div>
      </div>

    </>

  );
};

export default SellerProfile;
