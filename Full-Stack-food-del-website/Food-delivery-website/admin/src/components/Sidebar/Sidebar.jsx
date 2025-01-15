import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
/*
import React from 'react';

This line imports the React library, which is necessary to create React components. React is the core library that allows for component-based development in a React application.
import './Sidebar.css';

This line imports a CSS file named Sidebar.css. This file contains the styles that will be applied to the elements within the Sidebar component, allowing for customized design and layout.
import { assets } from '../../assets/assets';

This line imports the assets object from a directory (../../assets/assets). This object likely contains paths or URLs to various assets used throughout the application, such as images, icons, etc.
Example usage: If assets is something like { add_icon: '/images/add.png', order_icon: '/images/order.png' }, this allows the sidebar to access the paths to these images.
import { NavLink } from 'react-router-dom';

This line imports the NavLink component from react-router-dom. NavLink is a component that is used to define links in the React application for navigation. Unlike a regular a tag, NavLink provides additional features such as active styling when the link is active.
const Sidebar = () => {

This defines a functional component called Sidebar. The () => {} syntax is the arrow function syntax used to define a functional component in React.
return ( ... ): This part of the function specifies the JSX (JavaScript XML) that will be rendered by this component.
<div className='sidebar'>

This is a div element that acts as the main container for the sidebar. It has a class of sidebar, which is used for styling purposes (through Sidebar.css).
<div className="sidebar-options">

This is another div element that contains all the sidebar options. It serves as a container for the various NavLink components that define different menu items.
<NavLink to='/add' className="sidebar-option">

This is a NavLink component that links to the /add route in the application.
to='/add': This sets the destination route for this NavLink. When clicked, it will navigate to /add.
className="sidebar-option": This assigns the class sidebar-option to the NavLink. This class is used for styling the link items, such as changing colors, font sizes, or padding.
<img src={assets.add_icon} alt="" />

This img element is used to display an icon for the "Add items" option.
src={assets.add_icon}: This sets the src attribute of the img tag to the path or URL of the add icon image. The assets object is expected to have a property add_icon which contains the path to the add icon image (for example, assets.add_icon = '/images/add.png').
alt="": This attribute provides an alternative text for the image, useful for accessibility. The empty string here means there is no specific alternative text provided, but it is good practice to provide meaningful alternative text if possible (e.g., alt="Add items").
<p>Add items</p>

This p element provides the label for the menu item, "Add items". It is displayed alongside the icon to give context to what action the link represents.
</NavLink>
This closes the NavLink component. It indicates the end of the NavLink element, making sure all props and children are correctly passed and rendered.
<NavLink to='/list' className="sidebar-option">
This is another NavLink component, linking to the /list route.
to='/list': This sets the destination route for this NavLink. When clicked, it will navigate to /list.
className="sidebar-option": This assigns the class sidebar-option to the NavLink. This class is used for styling purposes.
<img src={assets.order_icon} alt="" />
This img element is used to display an icon for the "List items" option.
src={assets.order_icon}: This sets the src attribute of the img tag to the path or URL of the order icon image. The assets object is expected to have a property order_icon which contains the path to the order icon image (for example, assets.order_icon = '/images/order.png').
alt="": This attribute provides an alternative text for the image, useful for accessibility. The empty string here means there is no specific alternative text provided, but it is good practice to provide meaningful alternative text if possible.
<p>List items</p>
This p element provides the label for the menu item, "List items". It is displayed alongside the icon to give context to what action the link represents.
</NavLink>
This closes the NavLink component for the "List items" option.
<NavLink to='/orders' className="sidebar-option">
This is another NavLink component, linking to the /orders route.
to='/orders': This sets the destination route for this NavLink. When clicked, it will navigate to /orders.
className="sidebar-option": This assigns the class sidebar-option to the NavLink. This class is used for styling purposes.
<img src={assets.order_icon} alt="" />
This img element is used to display the icon for the "Orders" option.
src={assets.order_icon}: This sets the src attribute of the img tag to the path or URL of the order icon image.
 The assets object is expected to have a property order_icon which contains the path to the order icon image (for example, assets.order_icon = '/images/order.png').
alt="": This attribute provides an alternative text for the image, useful for accessibility. 
The empty string here means there is no specific alternative text provided, but it is good practice to provide meaningful alternative text if possible.
<p>Orders</p>
This p element provides the label for the menu item, "Orders". 
It is displayed alongside the icon to give context to what action the link represents.
</NavLink>
This closes the NavLink component for the "Orders" option.
</div>
This closing div tag corresponds to the opening div that acts as the container for the sidebar options.
</div>
This closing div tag corresponds to the opening div that acts as the main container for the sidebar.
export default Sidebar;
This exports the Sidebar component as the default export from this file. This allows it to be imported and used in other parts of the React application.











*/