import React, { useRef, useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const menuList = menuRef.current;
    let scrollSpeed = 2;  // Control the speed of horizontal scrolling
    let scrollDirection = null;

    // Handle mouse movement to determine scroll direction
    const handleMouseMove = (e) => {
      const menuWidth = menuList.offsetWidth;
      const mouseX = e.clientX - menuList.getBoundingClientRect().left;

      // Set scroll direction based on mouse position
      if (mouseX < menuWidth * 0.2) {
        scrollDirection = -scrollSpeed;  // Scroll left
      } else if (mouseX > menuWidth * 0.8) {
        scrollDirection = scrollSpeed;  // Scroll right
      } else {
        scrollDirection = 0;  // Stop scrolling
      }
    };

    // Function to continuously scroll based on direction
    const scrollMenu = () => {
      if (scrollDirection !== null && scrollDirection !== 0) {
        menuList.scrollLeft += scrollDirection;
      }
    };

    // Add event listeners for mouse and touch movements
    menuList.addEventListener('mousemove', handleMouseMove);
    const scrollInterval = setInterval(scrollMenu, 20);  // Continuously scroll based on direction

    // Cleanup event listeners and intervals on component unmount
    return () => {
      menuList.removeEventListener('mousemove', handleMouseMove);
      clearInterval(scrollInterval);  // Clear the interval to stop scrolling
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>
      <div className="explore-menu-list" ref={menuRef}>
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} 
            key={index} 
            className="explore-menu-list-item"
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
