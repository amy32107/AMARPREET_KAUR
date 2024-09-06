import express from "express"
import { addFood,listFood,removeFood} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter =express.Router();
//Image Storage engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
     return cb(null,`${Date.now()}${file.originalname}`)
    }
})
 
const upload = multer({storage:storage}) //using this we can store image in the upload folder


foodRouter.post("/add",upload.single("image"),addFood) //post method to send the data on the sever

foodRouter.get("/list",listFood)//new end point at /list
foodRouter.post("/remove",removeFood);

export default foodRouter;