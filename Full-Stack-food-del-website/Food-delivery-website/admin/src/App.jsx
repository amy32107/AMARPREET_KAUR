import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar  from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import {Navigate} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url = "http://localhost:5000"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
       
        <Sidebar/>
       <Routes>
       <Route path="*" element={<div>404 Not Found</div>} />
       <Route path="/" element={<Navigate to="/add" />} /> {/* Redirect root path */}
        <Route path = "/add" element={<Add/>}/>
        <Route path = "/list" element={<List/>}/>
        <Route path = "/orders" element={<Orders url={url}/>}/>
       </Routes>
      </div>
    </div>
  )
}
export default App