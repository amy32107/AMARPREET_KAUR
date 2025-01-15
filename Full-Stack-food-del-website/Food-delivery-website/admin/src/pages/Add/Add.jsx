import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

const Add = () => {
    const url = "http://localhost:5000";
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    // API Call
    const onSubmitHandler = async (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way
        console.log("Form Submitted"); // Debugging: Check if this is printed

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                // Show success toast notification
                toast.success("Food added successfully!");

                // Reset form state only after successful submission
                console.log("Food added successfully");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
            } else {
                console.log("Error in submission", response.data.message);
                // Show error toast notification
                toast.error("Failed to add food. Try again.");
            }
        } catch (error) {
            console.error("Submission failed", error);
            // Show error toast notification
            toast.error("Submission failed. Please check your connection.");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        required 
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name='name' 
                        placeholder='Type Here' 
                        required 
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        name="description" 
                        rows="6" 
                        placeholder='Write Content Here' 
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select 
                            onChange={onChangeHandler} 
                            name='category' 
                            value={data.category}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            type="number" 
                            name='price' 
                            placeholder='$20' 
                            required 
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
/*
1.) React: Enables the use of React features like JSX (HTML in JavaScript).
useState: A React hook that allows you to manage state (like variables) in functional components.
What is a React Hook?
React Hooks are special functions that let you use React features like state and lifecycle methods inside functional components. Before Hooks, these features were only available in class components.

What is useState?
useState is a React Hook used to add state to a functional component. It allows you to store and update data that changes over time, like form inputs, counters, or toggles.
Think of useState as a Box:
State is like a box:
It holds a value (e.g., a number, text, or any data you want to keep track of).
You can change what's inside the box whenever needed.
React needs to know when the box changes:
useState lets React remember what's in the box.
When you update the box, React automatically updates the part of the screen that depends on it.

2.)import './Add.css';
'./Add.css': Imports the CSS file to style this component.


3.)import { assets } from '../../assets/assets';
assets: Contains static resources like images or icons (e.g., an upload icon for the form).


4.)
import axios from "axios";
axios: A library used to send HTTP requests to APIs (e.g., to save the food data).
An API (Application Programming Interface) is a set of rules and protocols that allows different software 
applications to communicate with each other not visible and interactions thru it done thru through HTTP requests 
sent from clients (like mobile apps, web browsers, or other services).. 
It defines the methods and data formats that developers can use to interact with different software components, 
enabling them to access features or services of an application, 
library, or operating system without needing to understand its inner workings.
Axios is a JavaScript library that provides a straightforward way to send HTTP requests from a client-side application, 
typically for interacting with APIs. 

5.)
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast: A library used to display small notifications (success or error) on the screen.
The second line imports the default styles for react-toastify.


6.) Component Definition
const Add = () => {
Add: This is the name of the React functional component.
States


7.)
const url = "http://localhost:5000";
url: The base URL of your backend server.


8.)
const [image, setImage] = useState(false); 
image: Keeps track of the uploaded image file.
setImage: Updates the image value.
The default value is false, meaning no image is uploaded initially.


9.)
const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
});
data: Holds all the input values from the form (name, description, price, category).
setData: Updates the form values.
Initial values are empty strings or "Salad" for the category.


10.)
Handlers
onChangeHandler

const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
};
This function is called whenever a form input changes.
It:
Reads the name and value of the input that triggered the change.
Updates the data object by replacing the value of the specific field (e.g., name or price).
################
The function onChangeHandler you provided is a JavaScript 
function used to handle changes in input fields, such as text boxes, select boxes, or other form elements.
////////////////
event is a parameter passed to the function, which contains information about the event that triggered the function (in this case, an input change).
event.target refers to the specific HTML element that triggered the event (e.g., an <input>, <textarea>, or <select> element).
name is accessed from event.target.name, which gives the name attribute of the input element. This is useful for 
identifying which form field the change is coming from.
value is accessed from event.target.value, which contains the new value of the input 
element after it has been changed by the user.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
Imagine you have a form with a username input and an email input. When the user types something in the username field:

The onChangeHandler function is triggered.
event.target.name is "username," and event.target.value is whatever the user types (e.g., "JohnDoe").
The function updates the state using setData to reflect the new value for "username".
The component re-renders, showing the updated username in real-time.
11.)
onSubmitHandler

const onSubmitHandler = async (event) => {
Triggered when the form is submitted.
event.preventDefault(): Prevents the default behavior of the form (page refresh).


12.)
const formData = new FormData();
FormData: Used to send files and other form data to the server.

formData.append("name", data.name);
formData.append("description", data.description);
formData.append("price", Number(data.price));
formData.append("category", data.category);
formData.append("image", image);
Adds the form fields and the uploaded image to the formData object.


13.)
const response = await axios.post(`${url}/api/food/add`, formData);
Sends the formData to the server's /api/food/add endpoint using an HTTP POST request.


14.)
if (response.data.success) {
    toast.success("Food added successfully!");
    setData({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });
    setImage(false);
} else {
    toast.error("Failed to add food. Try again.");
}
If the server responds with success:
Shows a success message.
Resets the form fields.
If the server fails:
Shows an error message.

catch (error) {
    toast.error("Submission failed. Please check your connection.");
}
If something goes wrong (e.g., server is down), it shows a connection error.
Return JSX (UI)


15.) 
<div className='add'>
Wrapper div: The container for the entire form.
Image Upload Section

<div className="add-img-upload flex-col">
    <p>Upload Image</p>
    <label htmlFor='image'> htmlFor='image' associates the label with the input field using its id. 
    It helps improve accessibility by allowing users to interact with the file input using a label click.
        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" />
        image refers to the file selected by the user.
URL.createObjectURL(image) creates a temporary URL for the image file that allows it to be displayed as a preview in the <img> element.
If image is null or not selected yet, the fallback value is assets.upload_area, which is a placeholder image. 
This placeholder (assets.upload_area) represents an upload area (like a default image).
alt="Upload Area": This is an alt attribute used for accessibility, describing what the image is. 
It provides an alternative description for users who can't see the image, such as those using screen readers.
    </label>
    <input 
        onChange={(e) => setImage(e.target.files[0])} 
        type="file" 
        id="image" 
        hidden 
        required 

        e is the event object representing the file selection event.
e.target.files[0] gets the first (and usually only) file selected by the user.
setImage(e.target.files[0]): This function updates the image state with the selected file. 
It’s a function that you defined in your React component to manage the state of the selected image.
    />
</div>
A clickable area to upload an image.
16.)
URL.createObjectURL(image): Shows a preview of the uploaded image.
hidden: Hides the actual file input box, so users only see the label.

17.)
Product Name Section

<div className="add-product-name flex-col">
    <p>Product Name</p>
    <input 
        onChange={onChangeHandler} 
        value={data.name} 
        type="text" 
        name='name' 
        placeholder='Type Here' 
        required 
    />
</div>
Input field for the product name.
Updates the name field in the data object.


18.)
Product Description Section

<div className="add-product-description flex-col">
    <p>Product Description</p>
    <textarea 
        onChange={onChangeHandler} 
        value={data.description} 
        name="description" 
        rows="6" 
        placeholder='Write Content Here' 
        required
    ></textarea>
</div>
Textarea for the product description.
Updates the description field in the data object.


19.)
Category and Price Section

<div className="add-category-price">
    <div className="add-category flex-col">
        <p>Product Category</p>
        <select 
            onChange={onChangeHandler} 
            name='category' 
            value={data.category}
        >
            <option value="Salad">Salad</option>
            ...
        </select>
    </div>
    <div className="add-price flex-col">
        <p>Product Price</p>
        <input 
            onChange={onChangeHandler} 
            value={data.price} 
            type="number" 
            name='price' 
            placeholder='$20' 
            required 
        />
    </div>
</div>
Category: Dropdown to select a product category.
Price: Input field for the product price.

20.)
Submit Button
<button type='submit' className='add-btn'>ADD</button>
A button to submit the form.
21.)
Export

export default Add;
Makes the Add component available for use in other files.















*/