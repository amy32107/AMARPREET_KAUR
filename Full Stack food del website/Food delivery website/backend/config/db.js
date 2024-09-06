import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Amar74191:whatifishine2019@cluster0.ahjtb.mongodb.net/food-delivery').then(()=>console.log("DB CONNECTED"));

}