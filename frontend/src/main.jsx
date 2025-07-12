import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster position="top-right" reverseOrder={false} toastOptions={{style: {backgroundColor: "white", color: "black", paddingRight: "20px", paddingLeft: "20px"}, duration: 2000}} />
  </BrowserRouter>,
)
