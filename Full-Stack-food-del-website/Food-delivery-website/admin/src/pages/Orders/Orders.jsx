import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Fetched Orders:", response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error fetching orders:", error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const removeOrderHandler = async (orderId) => {
    try {
      const response = await axios.delete(`${url}/api/order/delete`,{data: {orderId},
      });

      if (response.data.success) {
        toast.success("Order removed successfully");
        await fetchAllOrders();
      } else {
        toast.error("Error removing order");
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Error removing order:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p className="order-item name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ', ' + order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                className='remove-button'
                onClick={() => removeOrderHandler(order._id)}
                disabled={order.status !== 'Delivered'}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
/*
import React, { useState, useEffect } from 'react';

This line imports React and two hooks, useState and useEffect, which are used for state management and side effects (like data fetching), respectively.
import './Orders.css';

This imports the CSS file for styling the component.
import axios from 'axios';

This imports the Axios library, which is used to make HTTP requests to the backend.
import { toast } from 'react-toastify';

This imports the toast function from the react-toastify library to display notifications to users (success, error messages, etc.).
import { assets } from '../../assets/assets';

This imports the icons or other assets needed for the component. Here, parcel_icon is used to display an icon for each order item.
const Orders = ({ url, token }) => {

The main functional component Orders takes url and token as props. These are used to send HTTP requests to the backend.
const [orders, setOrders] = useState([]);

This state variable orders holds the list of orders fetched from the backend. setOrders is a function that updates this state.
const fetchAllOrders = async () => {

This function fetches all orders from the backend using a GET request.
try {...}: The try block contains code that might throw an error.
const response = await axios.get(${url}/api/order/list, { headers: { Authorization: Bearer ${token} } });
axios.get() makes a GET request to the specified URL to fetch the order list.
The headers object includes the Authorization header with the token passed as a prop, ensuring that only authorized requests can access this data.
if (response.data.success) {...}
If the response from the backend indicates success (response.data.success is true):
setOrders(response.data.data); sets the state orders to the fetched data.
console.log("Fetched Orders:", response.data.data); logs the fetched orders to the console (for debugging purposes).
else {...}
If the response does not indicate success, display an error message using toast.error().
const statusHandler = async (event, orderId) => {

This function handles order status updates.
const response = await axios.post(url + "/api/order/status", { orderId, status: event.target.value }, { headers: { Authorization: Bearer ${token}, } });
Sends a POST request to the backend to update the order status.
orderId is the ID of the order whose status is to be updated.
event.target.value is the new status selected from the dropdown.
The headers object includes the Authorization header with the token for authentication.
if (response.data.success) {...}
If the response is successful:
Calls fetchAllOrders() to refresh the order list with updated statuses.
const removeOrderHandler = async (orderId) => {

This function handles the removal of an order.
try {...}
try block to catch any errors that might occur during the deletion process.
const response = await axios.delete(${url}/api/order/delete, { data: { orderId }, });
Sends a DELETE request to the backend to delete the order.
orderId is the ID of the order to be deleted.
data object contains the orderId.
if (response.data.success) {...}
If the response is successful:
toast.success("Order removed successfully"); displays a success notification.
Calls fetchAllOrders() to refresh the order list after deletion.
useEffect(() => { fetchAllOrders(); }, [url]);

useEffect hook to run a side effect (fetching orders) when the component mounts or when url changes.
The dependency array [url] ensures that fetchAllOrders() is called whenever url changes, meaning when the backend API URL is updated.
This effect runs once when the component mounts (because url is a dependency).
return ( ... )

JSX markup rendering the component:
<div className='order add'>: Outer div with a class name order add.
<h3>Order Page</h3>: Displays the title of the page.
<div className="order-list">: Container for the list of orders.
orders.map((order, index) => {...}): Iterates over the orders array to display each order.
<div key={index} className='order-item'>: Wrapper for each order item.
<img src={assets.parcel_icon} alt="" />: Displays the parcel icon for each order.
<div>: Container for order details.
<p className='order-item-food'>: Displays the names and quantities of items in the order.
order.items.map((item, index) => {...}): Maps over the items array of the order.
If it's the last item, it returns the name and quantity.
Otherwise, it returns the name, quantity, and a comma.
<p className="order-item name">: Displays the full name of the customer who placed the order.
<div className="order-item-address">: Container for the customer's address.
<p>{order.address.street + ","}</p>: Displays the street.
<p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ', ' + order.address.zipcode}</p>: Displays the full address.
<p className="order-item-phone">{order.address.phone}</p>: Displays the customer's phone number.
<p>Items : {order.items.length}</p>: Displays the number of items in the order.
<p>${order.amount}</p>: Displays the total amount of the order.
<select onChange={(event) => statusHandler(event, order._id)} value={order.status}>: Dropdown to select the order status.
<option value="Food Processing">Food Processing</option>: Option for "Food Processing" status.
<option value="Out for delivery">Out for delivery</option>: Option for "Out for delivery" status.
<option value="Delivered">Delivered</option>: Option for "Delivered" status.
<button className='remove-button' onClick={() => removeOrderHandler(order._id)} disabled={order.status !== 'Delivered'}>: Button to remove the order.
If the order status is not "Delivered", the button is disabled to prevent deletion.
On click, it calls removeOrderHandler() with the order ID.
</div>: Closing div tags for the JSX structure.

</div>: Closing div tags for the main Orders component.

This code is designed to fetch, display, and manage orders for a user in a React application, allowing users to view order details, update statuses, and remove orders when appropriate.



















*/