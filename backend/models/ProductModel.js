const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    costPrice: {
        type: String,
        required: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now() 
    },
    unit: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priceHistory: [{
        costPrice: {
            type: String,
            required: true,
        },
        sellingPrice: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
    }]
}, {timestamps: true})

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema)
module.exports = ProductModel