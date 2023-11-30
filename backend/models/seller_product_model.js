const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    bidder: [{
        type: ObjectId,
        ref: "CustomerModel"
    }],

    messages: [{
        messageText: String,
        messagedBy: { type: ObjectId, ref: "CustomerModel" }
    }],

    author: {
        type: ObjectId,
        ref: "SellerModel"
    }
});

mongoose.model("SellerProductModel", productSchema);
