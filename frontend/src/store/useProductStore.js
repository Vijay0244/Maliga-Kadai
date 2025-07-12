import { create } from 'zustand';
import { Axios } from '../utils/Axios';
import { handleError } from '../utils/handleError';
import toast from 'react-hot-toast';

export const useProductStore = create((set, get) =>({
    products: [],
    error: null,

    isFetchingProducts: false,
    isAddingProducts: false,
    isEditingProducts: false,
    isDeletingProducts: false,

    setError: (err) =>{
        set({ error: err })
    },

    fetchProducts: async() =>{
        set({ isFetchingProducts: true })
        const { setError } = get()
        try{
            const response = await Axios.get(`/product/get/all`)
            if(response.data.success){
                set({ products: response.data.products })
            }
        }
        catch(err){
            console.log(`Error in Fetching Products - ${err.message}`)
            handleError(err, setError)
        }
        finally{
            set({ isFetchingProducts: false })
        }
    },

    addProducts: async(name, costPrice, sellingPrice, date, category, unit) =>{
        set({ isAddingProducts: true })
        const { products, setError } = get()
        try{
            const response = await Axios.post('/product/add', {name: name, costPrice: costPrice, sellingPrice: sellingPrice, date: date, category: category, unit: unit})
            if(response.data.success){
                set({ products: [...products, response.data.newProduct] })
                toast.success(response.data.message)
            }
        }
        catch(err){
            console.log(`Error in Add Products - ${err.message}`)
            handleError(err, setError)
        }
        finally{
            set({ isAddingProducts: false })
        }
    },

    editProducts: async(productId, name, costPrice, sellingPrice, category, unit) =>{
        set({ isEditingProducts: true })
        const { products, setError } = get()
        try{
            const response = await Axios.put(`/product/edit/${productId}`, {name: name, costPrice: costPrice, sellingPrice: sellingPrice, category: category, unit: unit})
            if(response.data.success){
                const updated = response.data.updatedProduct
                const updatedProducts = products.map((element) =>element._id == productId ? updated : element)
                set({ products: updatedProducts })
                toast.success(response.data.message)
            }
        }
        catch(err){
            console.log(`Error in Edit Products - ${err.message}`)
            handleError(err, setError)
        }
        finally{
            set({ isEditingProducts: false })
        }
    },

    deleteProducts: async(productId) =>{
        set({ isDeletingProducts: true })
        const { products, setError } = get()
        try{
            const response = await Axios.delete(`/product/delete/${productId}`)
            if(response.data.success){
                let tempProducts = products.filter((element) =>element._id != productId)
                set({ products: tempProducts })
                toast.success(response.data.message)
            }
        }
        catch(err){
            console.log(`Error in Delete Products - ${err.message}`)
            handleError(err, setError)
        }
        finally{
            set({ isDeletingProducts: false })
        }
    }
}))
