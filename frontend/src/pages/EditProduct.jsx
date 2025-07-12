import React, { useState, useEffect, useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import PriceHistory from "../components/PriceHistory";
import { formatDateTime, formatPrice } from "../utils/helper";
import FormInputs from "../components/FormInputs";

const EditProduct = () => {
  const { editProducts, isEditingProducts, error, setError, products, fetchProducts } = useProductStore()
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    sellingPrice: "",
    category: "",
    unit: "",
  })
  const [showPriceHistory, setShowPriceHistory] = useState(false)
  const { productId } = useParams()
  const navigate = useNavigate()

  const eachProduct = useMemo(() =>{
    return products.find((element) => element._id === productId)
  }, [productId, products])

  useEffect(() => {
    if(products.length === 0){
      fetchProducts()
    }
  }, [])

  useEffect(() => {
    if(productId && eachProduct){
      setFormData({
        name: eachProduct.name || "",
        costPrice: eachProduct.costPrice || "",
        sellingPrice: eachProduct.sellingPrice || "",
        category: eachProduct.category || "",
        unit: eachProduct.unit || ""
      })
    }
  }, [eachProduct, productId])

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(!formData.name){
      return setError("Name is required")
    }
    if(!formData.costPrice){
      return setError("Cost Price is required")
    }
    if(!formData.sellingPrice){
      return setError("Selling Price is required")
    }
    if(!formData.category){
      return setError("Category is required")
    }
    if(!formData.unit){
      return setError("Unit is required")
    }

    if(parseFloat(formData.costPrice) < 0){
      return setError("Cost Price cannot be negative")
    }

    if(parseFloat(formData.sellingPrice) < 0){
      return setError("Selling Price cannot be negative")
    }

    await editProducts(productId, formData.name, formData.costPrice, formData.sellingPrice, formData.category, formData.unit )
    navigate("/")
  }

  if(!eachProduct){
    return(
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Product not found</div>
      </div>
    )
  }

  const sortedPriceHistory = eachProduct.priceHistory? [...eachProduct.priceHistory].sort((a, b) => new Date(b.date) - new Date(a.date)) : []

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
          <Link to={"/"} className="text-gray-500 hover:text-gray-700">
            <X />
          </Link>
        </div>

        <div className="flex flex-col gap-y-16">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">

              <FormInputs formData={formData} setFormData={setFormData} error={error} />

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Product Information</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Current Cost Price: ₹{formatPrice(eachProduct.costPrice)}</p>
                  <p>Current Selling Price: ₹{formatPrice(eachProduct.sellingPrice)}</p>
                  <p>Date Added: {formatDateTime(eachProduct.date)}</p>
                  <p>Last Updated:{" "}
                    {formatDateTime(eachProduct.updatedAt || eachProduct.date)}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button type="submit" disabled={isEditingProducts} className="flex-1 cursor-pointer disabled:cursor-not-allowed bg-blue-600 flex items-center justify-center gap-x-2 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {isEditingProducts ? <><Loader2 className="animate-spin size-5" />Updating...</> : "Update Product"}
                </button>
                <Link to={"/"} className="flex-1 text-center flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Price History</h3>
              <button onClick={() => setShowPriceHistory(!showPriceHistory)}className="text-blue-600 cursor-pointer hover:text-blue-800 text-sm font-medium">
                {showPriceHistory ? "Hide History" : "Show History"}
              </button>
            </div>

            {showPriceHistory && (
              <PriceHistory sortedPriceHistory={sortedPriceHistory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;