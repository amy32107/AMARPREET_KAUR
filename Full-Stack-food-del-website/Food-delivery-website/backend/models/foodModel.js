import mongoose from "mongoose";
// schema to describe food model properties

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    image : {type:String,required:true},//store product image url
    category : {type:String,required:true}



})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema) //is the model is there it will use if its not there then it will create a new model
export default foodModel;
