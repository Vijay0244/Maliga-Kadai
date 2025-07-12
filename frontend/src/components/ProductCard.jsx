import React from "react";
import { formatDate } from "../utils/helper";
import { useProductStore } from "../store/useProductStore";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  const { deleteProducts, isDeletingProducts } = useProductStore()
  
  const profit = parseFloat(product.sellingPrice) - parseFloat(product.costPrice)
  const profitMargin = ((profit / parseFloat(product.costPrice)) * 100).toFixed(1)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{product.category}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Unit: {product.unit}</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Cost Price:</span>
          <span className="text-sm font-medium">₹{product.costPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Selling Price:</span>
          <span className="text-sm font-medium text-green-600">₹{product.sellingPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Profit:</span>
          <span className={`text-sm font-medium ${ profit >= 0 ? "text-green-600" : "text-red-600" }`}>₹{profit.toFixed(2)} ({profitMargin}%)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Date Added:</span>
          <span className="text-sm">{formatDate(product.date)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <Link to={`/edit/${product._id}`} className="flex-1 text-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
          Edit
        </Link>
        <button onClick={() => deleteProducts(product._id)} disabled={isDeletingProducts} className="flex-1 flex justify-center cursor-pointer disabled:cursor-not-allowed items-center gap-x-2 bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50">
          {isDeletingProducts == product._id ? <><Loader className="animate-spin size-5" /> Deleting...</> : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
