import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
/*
import React from 'react';

This line imports the React library, which is necessary to create React components. 
It allows the use of React's features such as JSX, hooks, and component lifecycle methods.
import './Navbar.css';

This line imports a CSS file named Navbar.css. 
This file contains styles that are applied to the elements within the Navbar component, allowing for customized design and layout.
import { assets } from '../../assets/assets';

This line imports the assets object from a directory (../../assets/assets). 
This object likely contains paths or URLs to various assets used throughout the application, such as images, icons, etc.
const Navbar = () => {

This defines a functional component called Navbar. The () => {} syntax is the arrow function syntax used to define a functional component in React.
return ( ... ): This part of the function specifies the JSX (JavaScript XML) that will be rendered by this component.
<div className='navbar'>

This is a div element that acts as the main container for the navbar. 
It has a class of navbar, which is used for styling purposes (through Navbar.css).
<img className='logo' src={assets.logo} alt="" />

This img element is used to display the logo image in the navbar.
className='logo': This assigns the CSS class logo to the image. 
This class can be defined in Navbar.css to apply specific styles like size, margin, padding, etc.
src={assets.logo}: This sets the src attribute of the img tag to the path or URL of the logo image.
 The assets object is expected to have a property logo which contains the path to the logo image (for example, assets.logo = '/images/logo.png').
alt="": This attribute provides an alternative text for the image, useful for accessibility. 
The empty string here means there is no specific alternative text provided, but it is good practice to provide meaningful alternative text if possible.
<img className='profile' src={assets.profile_image} alt="" />

This img element is used to display the profile image in the navbar.
className='profile': This assigns the CSS class profile to the image. 
This class is also defined in Navbar.css and can be used to style the profile image (e.g., setting the size, border, or margin).
src={assets.profile_image}: This sets the src attribute of the img tag to the path or URL of the profile image. 
The assets object is expected to have a property profile_image which contains the path to the profile image (for example, assets.profile_image = '/images/profile.png').
alt="": This attribute provides an alternative text for the image. 
Again, an empty string is used here, but it's best to provide specific alternative text for better accessibility (e.g., alt="User's profile picture").
</div>

This closing div tag corresponds to the opening div that acts as the container for the elements in the Navbar.
export default Navbar;

This exports the Navbar component as the default export from this file. This allows it to be imported and used in other parts of the React application.



*/