import React, { useContext,useEffect} from 'react';
import './Cart.css';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, isLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    console.log("isLoggedIn:", isLoggedIn); 
    if (isLoggedIn) {
      navigate('/order');
    } else {
      toast.error('Please login to proceed to checkout', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            // Construct the correct image URL
            const imageUrl = item.image.startsWith('/images/') ? `${url}${item.image}` : `${url}/images/${item.image}`;
            console.log("Corrected Image URL in Cart:", imageUrl); // Log the corrected image URL for debugging

            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={imageUrl} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <button onClick={() => removeFromCart(item._id)}>x</button>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      
      <div className="cart-bottom">
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
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        
        <div className="cart-promocode">
          <p>If you have a promocode, Enter it here !</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Cart;
