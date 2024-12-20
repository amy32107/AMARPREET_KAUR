import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import * as jwt_decode from 'jwt-decode';
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartItems, food_list, token, url } = useContext(StoreContext);
  
  // Compute the subtotal
  const subtotal = food_list.reduce((acc, item) => {
    if (cartItems[item._id]) {
      return acc + item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  // Conditional logic for delivery fee
  const deliveryFee = subtotal > 0 ? 2 : 0;

  // Compute the total
  const total = subtotal + deliveryFee;

  // State for delivery information
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handle input changes for delivery information
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // Place the order and handle API call
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
  
    // Prepare order items
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    // Decode the token to extract userId (this assumes token is a JWT)
    const decodedToken = decodeJWT(token); // This function will decode the token
    const userId = decodedToken ? decodedToken.id : null; // Assuming the token has the 'id' field
  
    // Check if we successfully decoded the token
    if (!userId) {
      alert("Invalid token or user not authenticated");
      return;
    }
  
    // Prepare order data with userId (extracted from the token), items, and total amount
    let orderData = {
      userId: userId, // Use decoded userId
      address: data,
      items: orderItems,
      amount: total,
    };
  
    // Log the data being sent to the backend
    console.log("Order Data:", orderData);  // Log the order data
    console.log("Token:", token);  // Log the token being sent
  
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` },  // Send token in headers for authentication
      });
  
      console.log("Response:", response.data);  // Log the response from the server
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);  // Redirect to payment page
      } else {
        alert("Error placing the order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing the order");
    }
  };
  
  // Helper function to decode JWT
  const decodeJWT = (token) => {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];  // Get the payload part of the JWT
      const decodedPayload = atob(payload); // Decode from base64
      return JSON.parse(decodedPayload); // Parse it as JSON
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const navigate = useNavigate();

  // Redirect to cart page if no token or total is 0
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (total === 0) {
      navigate('/cart');
    }
  }, [token, total, navigate]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          {subtotal > 0 && (
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee}</p>
            </div>
          )}
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
