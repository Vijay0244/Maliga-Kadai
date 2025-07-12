import React, { useState, useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const ProductList = () => {
  const { products, fetchProducts, isFetchingProducts } = useProductStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
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
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>{
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "" || product.category === selectedCategory

    let matchesDateRange = true
    if(dateFrom || dateTo){
      const productDate = new Date(product.date)
      const fromDate = dateFrom ? new Date(dateFrom) : null
      const toDate = dateTo ? new Date(dateTo) : null

      if(fromDate && toDate){
        matchesDateRange = productDate >= fromDate && productDate <= toDate
      } 
      else if(fromDate){
        matchesDateRange = productDate >= fromDate
      } 
      else if(toDate){
        matchesDateRange = productDate <= toDate
      }
    }

    return matchesSearch && matchesCategory && matchesDateRange
  })

  const sortedProducts = [...filteredProducts].sort((a, b) =>{
    if(sortBy === "price-low"){
      return parseFloat(a.sellingPrice) - parseFloat(b.sellingPrice)
    } 
    else if(sortBy === "price-high"){
      return parseFloat(b.sellingPrice) - parseFloat(a.sellingPrice)
    } 
    else if(sortBy === "date-new"){
      return new Date(b.date) - new Date(a.date)
    } 
    else if(sortBy === "date-old"){
      return new Date(a.date) - new Date(b.date)
    }
    return 0
  })

  if(isFetchingProducts){
    return(
      <Loading />
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none">
              <option value="">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="date-new">Date: Newest First</option>
              <option value="date-old">Date: Oldest First</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product}  />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {products.length === 0 ? "No products found. Add your first product!" : "No products match your search criteria."}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
