import React, { useState } from 'react'
import './Product.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const Product = (props) => {

    const product = props.product

    const [image, setImage] = useState({ preview: '', data: '' })
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")


    const [edit, setEdit] = useState(false)


    const showEdit = () => setEdit(true)
    const handleCloseEdit = () => setEdit(false)



    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
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

    const editProduct = (id) => {

        axios.put(`${API_BASE_URL}/api/editproduct/${id}`, { image: image.preview, title, description, price }, CONFIG_OBJ)
            .then((result) => {
                console.log(result);
                handleCloseEdit()
                setDescription("")
                setTitle("")
                setImage({ preview: "", data: "" })
                setPrice("")
                props.getAllProducts()
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data)
            });

    }



    const deleteProduct = (id) => {

        axios.delete(`${API_BASE_URL}/api/deleteproduct/${id}`, CONFIG_OBJ)
            .then((result) => {
                console.log(result);
                props.getAllProducts()
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (

        <div className="card me-3 mb-3" style={{ width: 18 + "rem" }}>
            <img src={product.image} className="product-image" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p>{product.price}</p>
                <Button variant="warning" onClick={showEdit} >
                    Edit Product
                </Button>
                <button onClick={() => deleteProduct(product._id)} className="btn btn-danger ms-3">Delete</button>
            </div>


            <>
                <Modal show={edit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label htmlFor='image'>Image: </label> <br />
                            <input name="file" type="file" id="image" className="FileUpload mb-3" accept=".jpg,.png,.gif" onChange={handleFileSelect} /><br />
                            {image.preview && <img src={image.preview} alt="..." className='w-100 mb-3' />}
                            <label htmlFor='title'>Title: </label>
                            <input type= "text" className='form-control mb-3' id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            <label htmlFor='description'>Description: </label>
                            <input type= "text" className='form-control' id='description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            <label htmlFor='price'>Price: </label>
                            <input type='number' className='form-control' id='price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>

                        <Button variant="warning" onClick={() => editProduct(product._id)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>

    )
}

export default Product