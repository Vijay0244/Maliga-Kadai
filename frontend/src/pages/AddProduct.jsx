import React, { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { Loader2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FormInputs from "../components/FormInputs";

const AddProduct = () => {
  const { addProducts, isAddingProducts, error, setError } = useProductStore()
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    sellingPrice: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
    unit: "",
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
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
    if(!formData.date){
      return setError("Date is required")
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

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0]
    const fullDate = `${formData.date}T${timeStr}`

    await addProducts(formData.name, formData.costPrice, formData.sellingPrice, fullDate, formData.category, formData.unit)
    navigate("/")
    setFormData({
      name: "",
      costPrice: "",
      sellingPrice: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      unit: ""
    }) 
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Product
          </h2>
          <Link to={"/"} className="text-gray-500 hover:text-gray-700">
            <X />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormInputs formData={formData} setFormData={setFormData} error={error} date />

          <div className="flex space-x-4">
            <button type="submit" disabled={isAddingProducts} className="flex-1 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
              {isAddingProducts ? <><Loader2 className="animate-spin size-5" />Adding...</> : "Add Product"}
            </button>
            <Link to="/" className="flex-1 text-center bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;