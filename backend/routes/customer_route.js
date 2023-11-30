const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CustomerModel = mongoose.model("CustomerModel");
const SellerProductModel = mongoose.model("SellerProductModel");
const { JWT_SECRET } = require('../config');
const protectedResource = require('../middleware/customerProtectedResource')

router.post("/api/auth/customer/signup", (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    CustomerModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new CustomerModel({ fullName, email, password: hashedPassword, type: "customer" });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post("/api/auth/customer/login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    CustomerModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "fullName": userInDB.fullName, "type": userInDB.type };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});


router.put('/api/bid/:id', protectedResource, (req, res) => {
    const id = req.params.id

    SellerProductModel.findByIdAndUpdate(id, {
        $push: { bidder: req.user._id }
    }, {
        new: true
    })
        .exec()
        .then((result) => {
            res.status(201).json({ result: result })

        })
        .catch((error) => { console.log(error) })
})


router.post('/api/contactseller/:id', protectedResource, (req, res) => {
    req.user.password = undefined
    const message = { messageText: req.body.message, messagedBy: req.user }
    const id = req.params.id
    SellerProductModel.findByIdAndUpdate(id, {
        $push: { messages: message }
    }, {
        new: true
    })
        .populate("messages.messagedBy", "fullName email")
        .exec()
        .then((result) => {
            res.status(201).json({ result: result })

        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;