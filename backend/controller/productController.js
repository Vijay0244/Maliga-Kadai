const ProductModel = require('../models/ProductModel')

const addproductController = async(req, res) =>{
    try{
        const { name, costPrice, sellingPrice, date, category, unit } = req.body
        
        if(!name){
            return res.status(400).json({success: false, error: "Name is required"})
        }
        if(!costPrice){
            return res.status(400).json({success: false, error: "Cost Price is required"})
        }
        if(!sellingPrice){
            return res.status(400).json({success: false, error: "Selling Price is required"})
        }
        if(!date){
            return res.status(400).json({success: false, error: "Date is required"})
        }
        if(!category){
            return res.status(400).json({success: false, error: "Category is required"})
        }
        if(!unit){
            return res.status(400).json({success: false, error: "Unit is required"})
        }

        const newProduct = new ProductModel({
            name: name,
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            date: date,
            category: category,
            unit: unit,
            priceHistory: [{
                costPrice: costPrice,
                sellingPrice: sellingPrice,
                date: date
            }]
        })
        await newProduct.save()

        return res.status(200).json({success: true, message: "Product added successfully", newProduct: newProduct})
    }
    catch(err){
        console.log(`Error in Add Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

const getAllproductController = async(req, res) =>{
    try{
        const products = await ProductModel.find()
        return res.status(200).json({success: true, products: products})
    }
    catch(err){
        console.log(`Error in Get All Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

const editproductController = async(req, res) =>{
    try{
        const { name, costPrice, sellingPrice, category, unit } = req.body
        const { productId } = req.params
        
        if(!name){
            return res.status(400).json({success: false, error: "Name is required"})
        }
        if(!costPrice){
            return res.status(400).json({success: false, error: "Cost Price is required"})
        }
        if(!sellingPrice){
            return res.status(400).json({success: false, error: "Selling Price is required"})
        }
        if(!category){
            return res.status(400).json({success: false, error: "Category is required"})
        }
        if(!unit){
            return res.status(400).json({success: false, error: "Unit is required"})
        }

        const exist = await ProductModel.findById(productId)
        if(sellingPrice != exist.sellingPrice || costPrice != exist.costPrice){
            const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
                $set: {
                    name: name,
                    costPrice: costPrice,
                    sellingPrice: sellingPrice,
                    category: category,
                    unit: unit
                },
                $push: {
                    priceHistory: {
                        costPrice: costPrice,
                        sellingPrice: sellingPrice,
                        date: new Date()
                    }
                }
            }, {new: true})
            return res.status(200).json({success: true, message: "Product edited successfully", updatedProduct: updatedProduct})
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
            name: name,
            costPrice: costPrice,
            sellingPrice: sellingPrice,
            category: category,
            unit: unit
        }, {new: true})
        return res.status(200).json({success: true, message: "Product edited successfully", updatedProduct: updatedProduct})
    }
    catch(err){
        console.log(`Error in Edit Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

const deleteproductController = async(req, res) =>{
    try{
        const { productId } = req.params
        await ProductModel.findByIdAndDelete(productId)
        return res.status(200).json({success: true, message: "Product deleted successfully"})
    }
    catch(err){
        console.log(`Error in Delete Product Controller - ${err.message}`)
        return res.status(500).json({message: 'Internal Server Error', error: err.message, success: false})
    }
}

module.exports = { addproductController, getAllproductController, editproductController, deleteproductController }