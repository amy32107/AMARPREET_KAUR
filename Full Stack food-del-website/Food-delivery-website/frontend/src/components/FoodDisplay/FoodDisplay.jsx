import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/storecontext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // Log the entire food_list for debugging purposes
  console.log('Food List:', food_list);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item, index) => {
          // Check if the item has a valid _id
          if (!item._id) {
            console.warn(`Item at index ${index} is missing an _id.`, item);
          }

          // Assign a fallback key if the item is missing an _id
          const uniqueKey = item._id || `temp-id-${index}`;

          // Render items that match the selected category or all items if category is 'All'
          if (category === 'All' || category === item.category) {
            return (
              <FoodItem
                key={uniqueKey}  // Use fallback key if _id is missing
                id={item._id || `temp-id-${index}`}  // Use fallback _id in props as well
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }

          return null; // Don't render items that don't match the category
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
