/*create basic express server using es6 features*/
import express, { response } from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import path from "path"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
//app config
const app = express()
const port = 5000
//middleware
app.use(express.json())//using this whenever we will get the request from frontend to backend connection that will be parsed using the json
app.use(cors()) //using this we can access backend from any frontend

//DB CONNECTION
connectDB();

//API End point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{ //whenever we hit this / end point we will get the message below
   res.send("API Working")
   
})//get method is a http method where we can request the data from the server also whenever we hit any url in the browser it gets executed  as a get method

app.listen(port,()=>{
   console.log(`Server Started on http://localhost:${port}`)
})
//thunder client extension used to test API

//mongodb+srv://Amar74191:whatifishine2019@cluster0.ahjtb.mongodb.net/?

/*here we have created API for adding food items display list of food items and remove the food item
now using this API we have to create an admin panel*/

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send({ success: false, message: 'Server Error' });
 });