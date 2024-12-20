import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if the user is logged in
    const url = "http://localhost:5000";

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    
        // Check if token exists
        if (token) {
            try {
                console.log('Token:', token);
                const response = await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    {
                        headers: { Authorization: `Bearer ${token}` } // Use Authorization header
                    }
                );
                console.log('Item added to cart:', response.data); // Debugging line
            } catch (error) {
                console.error("Error adding to cart:", error.message); // Debugging line
            }
        } else {
            console.error("No token found, please log in"); // Debugging line
        }
    };
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            console.log("Saved Token:", savedToken); // Debugging line
            if (savedToken) {
                setToken(savedToken);
                setIsLoggedIn(true); // Set isLoggedIn to true if token is found
                console.log("User is logged in."); // Debugging line
                await loadCartData(savedToken);
            } else {
                console.log("No token found, user is not logged in."); // Debugging line
            }
        }
        loadData();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setIsLoggedIn(false);
    };
    // Example login function to save token
const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        const token = response.data.token; // Token received from backend
  
        // Save the token to localStorage
        localStorage.setItem("token", token);
  
        // Update the context state
        setToken(token);
        setIsLoggedIn(true);
  
        // Optionally, redirect the user to a protected page
        history.push("/dashboard");
      } else {
        toast.error("Login failed: " + response.data.message);
      }
    } catch (error) {
      toast.error("Error during login: " + error.message);
    }
  };
  

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoggedIn, // Provide isLoggedIn to the context
        setIsLoggedIn, // Provide setIsLoggedIn to the context
        logout, // Provide logout function to the context
        handleLogin
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
