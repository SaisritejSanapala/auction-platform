const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const SellerProductModel = mongoose.model("SellerProductModel");
const protectedResource = require('../middleware/sellerProtectedResource')


router.post('/api/addproduct', protectedResource, (req, res) => {

    const { image,title, description, price } = req.body;

    if (!image || !description || !title || !price) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });

    }

    req.user.password = undefined;
    const productObj = new SellerProductModel({ image, description, title,price, author: req.user })
    productObj.save()
        .then((newProduct) => {
            res.status(201).json({ product: newProduct })
        }) 
        .catch((error) => { console.log(error) })


})


router.put('/api/editproduct/:id', protectedResource, (req, res) => {

    const { image, description, title, price } = req.body;
    const id = req.params.id

    if (!image || !description || !title || !price) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });

    }

    SellerProductModel.findByIdAndUpdate(id, { image,title, description, price })
        .exec()
        .then((result) => {
            res.status(201).json({ result: "success" })
        })
        .catch((error) => { console.log(error) })

})


router.delete('/api/deleteproduct/:id', protectedResource, (req, res) => {

    const id = req.params.id
    SellerProductModel.findByIdAndDelete(id)
        .then((result) => {
            res.status(201).json({ result: "product deleted successfully" })
        })
        .catch((error) => { console.log(error) })

})


router.get('/api/getmyallproducts', protectedResource, (req, res) => {
    const id = req.user._id;

    SellerProductModel.find({ author: req.user._id })
        .populate("author", "_id fullName")
        .then((result) => {
            res.status(201).json({ result: result })
        })
        .catch((error) => { console.log(error) })

})



router.get('/api/allproducts', (req, res) => {

    SellerProductModel.find({})
        .populate("author", "_id fullName")
        .then((result) => {
            res.status(201).json({ result: result })
        })
        .catch((error) => { console.log(error) })

})

router.get('/api/messages', protectedResource, (req,res) => {
    SellerProductModel.find({author: req.user._id})
    .populate({
        path: 'messages',
        select: 'messageText messagedBy',
        populate: {
            path: 'messagedBy',
            select: 'fullName email'
        }
    })
        .then((result) => {
            res.status(201).json({ result: result })
        })
        .catch((error) => { console.log(error) })
})

module.exports = router 