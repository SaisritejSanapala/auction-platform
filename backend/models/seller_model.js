const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type:{
        type: String
    }
});

mongoose.model("SellerModel", sellerSchema);