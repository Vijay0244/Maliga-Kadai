import React from 'react'
import Error from './Error'

const FormInputs = ({ formData, setFormData, error, date }) => {

    const categories = [
        "Vegetables",
        "Fruits",
        "Dairy Products",
        "Grains & Cereals",
        "Spices & Seasonings",
        "Beverages",
        "Snacks & Confectionery",
        "Cooking Oils",
        "Meat & Seafood",
        "Bakery Items",
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }
    
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="Enter product name" />
                {error == "Name is required" && <Error error={error} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Cost Price (₹)</label>
                    <input type="number" name="costPrice" value={formData.costPrice} onChange={handleChange} step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="0.00" />
                    {(error == "Cost Price is required" || error == "Cost Price cannot be negative") && <Error error={error} />}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price (₹)</label>
                    <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} step="0.01" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="0.00" />
                    {(error == "Selling Price is required" || error == "Selling Price cannot be negative") && <Error error={error} />}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
                        <option value="">Select category</option>
                        {categories.map((category) =>(
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    {error == "Category is required" && <Error error={error} />}
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" placeholder="e.g., 30g, 50kg, 1L, 12 pieces" />
                    {error == "Unit is required" && <Error error={error} />}
                </div>
            </div>

            {date && <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" />
                {error == "Date is required" && <Error error={error} />}
            </div>}
        </>
    )
}

export default FormInputs