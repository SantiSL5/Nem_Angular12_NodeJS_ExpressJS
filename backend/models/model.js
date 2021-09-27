const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required:true
    },
    categories: {
        type: [String],
        required: true
    },
    state: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    ubication: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean,
        default: false
    },
    issold: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        required: true
    },
    dataCreate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema);