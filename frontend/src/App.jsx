import React from "react";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const App = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:productId" element={<EditProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
