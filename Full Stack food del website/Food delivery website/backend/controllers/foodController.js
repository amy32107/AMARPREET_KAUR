import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add a new food item
const addFood = async (req, res) => {
    console.log(req.body);

    let image_filename = `/images/${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.status(200).json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving food list" });
    }
};

//remove food item
const removeFood = async (req,res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Food Removed"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
    
}

export { addFood, listFood,removeFood};
