const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const productRouter = require('./router/productRouter')
const connectDb = require('./config/connectDb')

const PORT = process.env.PORT

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = process.env.FRONTEND_USER_URL

        if(!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")){
            callback(null, true)
        } 
        else{
            callback(new Error("CORS not allowed for: " + origin))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/product', productRouter)

async function startServer(){
    try{
        await connectDb()
        app.listen(PORT, () =>{
            console.log(`Server Connected Successfully`)
        })
    }
    catch(err){
        console.log(`Error in Starting Server - ${err.message}`)
        process.exit(1)
    }
}

startServer()
