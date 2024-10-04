import express from "express"
const app=express()
import dotenv from "dotenv"
import db from "./db.js"
import authRouter from "./routes/authRouter.js"
import cors from "cors"
dotenv.config()
const port=process.env.PORT||3000
app.use(express.urlencoded()); 
app.use(cors({origin: "*"}))


app.use('/auth',authRouter)

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`)
})