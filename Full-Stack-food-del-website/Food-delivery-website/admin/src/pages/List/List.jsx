import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from 'react-toastify'

const List = () => {
  const url = "http://localhost:5000";  // Base URL
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const removeFood = async (foodId) => {
    
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          // Sanitize the URL and image path
          const sanitizedImagePath = item.image.replace(/^\/+/, '');  // Remove leading slashes from image path
          const imageUrl = `${url.replace(/\/+$/, '')}/${sanitizedImagePath}`;  // Final image URL

          console.log(imageUrl);

          return (
            <div key={index} className='list-table-format'>
              <img src={imageUrl} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
/*
1.)
useEffect: Hook used to perform side effects in functional components (e.g., data fetching).
useState: Hook used to maintain state variables.
What are Hooks in React?
In React, hooks are special functions that let you use state and other React features in functional components. 
Before hooks were introduced, functional components couldn't have state or lifecycle methods directly. 
Hooks allow you to use state and lifecycle methods without converting functional components into class components. 
Here are a few important hooks:

useState: Allows you to add state to your functional component.
useEffect: Allows you to perform side effects in your functional component.
What is a "Hook"?
A hook is a function: Just like any other function in JavaScript.
Used within a functional component: You call them directly within a functional component.
They allow you to use state, lifecycle methods, and other React features: These are features that were previously only available in class components.

What is a "Side Effect"?
A side effect refers to anything that affects your component outside of its state and props. Common side effects include:
Fetching data from an API
Interacting with the browser (like updating the document title)
Handling subscriptions to external services (e.g., WebSockets)
Modifying the DOM directly
###################################################
State in React
What is State?

State is a way to store data in a component that can change over time. 
Think of it as a variable that can be changed and will cause the component to re-render when it does.

Why is State Important?
State is crucial for making components interactive. 
It allows components to hold and manage data that can change dynamically, like user input, counters, lists, etc.
Examples of State:
A counter in your component that increments every time a button is clicked.
A form where users can input text and the input value needs to be updated as they type.
A list of items fetched from an API that changes as new items are added or removed.
//////////////////////////////////////////////////////////////////////////////
Props in React
What are Props?

Props (short for "properties") are a way to pass data from a parent component to a child component.
Think of props as the information that you pass down from parent to child like a baton in a relay race.
Why are Props Important?

Props allow you to make your components reusable by separating concerns. 
You can use the same component in different places with different data.
They are read-only: child components cannot change the props they receive.
Examples of Props:

A button component where the label is passed as a prop.
A list component that displays items passed to it as props.
A form component where you pass the initial values for the form fields as props.


2.)
const List = () => {
Declaring a functional component named List.

3.)
const fetchList = async () => {
  const response = await axios.get(`${url}/api/food/list`);
  if (response.data.success) {
    setList(response.data.data);
  } else {
    toast.error("Error");
  }
};
const fetchList = async () => { ... }: An asynchronous function to fetch the list of food items from the server.
axios.get(${url}/api/food/list): Sending a GET request to the server to retrieve the food list from the API endpoint.
if (response.data.success) { ... } else { ... }: Checking if the response indicates success (response.data.success is true):
If true, updating the list state with the fetched data (response.data.data).
If false, displaying an error toast notification using react-toastify.

4.)
const removeFood = async (foodId) => {
  const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  await fetchList();  // Refresh the list after deletion
  if(response.data.success){
    toast.success(response.data.message);
  } else {
    toast.error("Error");
  }
}
const removeFood = async (foodId) => { ... }: An asynchronous function to remove a food item.
axios.post(${url}/api/food/remove,{id:foodId}): Sending a POST request with the ID of the food item to be removed.
await fetchList();: Refreshing the list after an item has been removed.
if(response.data.success) { ... } else { ... }: Checking if the response indicates success:
If true, displaying a success toast notification with the returned message.
If false, displaying an error toast notification.

5.)
useEffect(() => {
  fetchList();
}, []);
Using the useEffect hook to call fetchList when the component mounts.
The empty array [] as the second argument indicates that this effect should only run once, when the component mounts.

What is a Component Mount?
Mounting refers to the process when a component is being inserted into the DOM (Document Object Model). When a component is mounted, it’s ready to be used and displayed on the screen.
React Lifecycle: In React, components have a lifecycle with different phases—mounting, updating, and unmounting. The mounting phase is where the component is being initialized and added to the DOM.
Mounting Process:
Rendering: When a React component is first created, it goes through a rendering process. React will prepare the component, apply any necessary transformations, and then insert it into the DOM.
UseEffect Hook with an Empty Dependency Array: When you use useEffect with an empty dependency array [], 
you’re telling React to run the effect only once when the component is initially rendered and not run it again when the component updates (re-renders).

6.)
return (
  <div className='list add flex-col'>
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => {
        const sanitizedImagePath = item.image.replace(/^\/+/, '');  // Remove leading slashes from image path
        const imageUrl = `${url.replace(/\/+$/, '')}/${sanitizedImagePath}`;  // Final image URL

        console.log(imageUrl);

        return (
          <div key={index} className='list-table-format'>
            <img src={imageUrl} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        );
      })}
    </div>
  </div>
);
return: JSX that defines the structure of the component.
<div className='list add flex-col'>: A container for the entire list component with CSS class list, add,
 and flex-col used for styling and layout.
<p>All Foods List</p>: A heading displaying the title "All Foods List".
<div className="list-table">: Container for the list of food items displayed in a table format.
<div className="list-table-format title">: Header row for the table with column names: "Image", "Name", "Category", "Price", and "Action".
{list.map((item, index) => { ... })}: Mapping over the list state to display each food item:
sanitizedImagePath: Removing any leading slashes from the image path to avoid incorrect URLs.
imageUrl: Constructing the final URL for the food image by appending the sanitized image path to the base URL.
<img src={imageUrl} alt="" />: Displaying the image.
<p>{item.name}</p>, <p>{item.category}</p>, <p>${item.price}</p>: Displaying the food name, category, and price.
<p onClick={()=>removeFood(item._id)} className='cursor'>X</p>: An action button for removing a food item by its ID. 
Clicking on it triggers the removeFood function.







*/