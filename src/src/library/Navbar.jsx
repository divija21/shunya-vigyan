import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("libuser"));
   
    const handleClick = ()=>{
        navigate('/login')
    }
    const handleProfile=()=>{
      navigate('/userdetails')
    }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-400 p-6">
      {/* Logo and Name */}
      <div className="flex items-center flex-shrink-0 text-white mr-6">
       
        <span className="font-semibold text-xl tracking-tight">Shuniya Vigyan</span>
      </div>

      {/* Login and Signup Buttons */}
      <div className="flex items-center">
        {!user?<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300" onClick={handleClick}>SignIn</button> : <div className=' bg-gray-400 cursor-pointer'><VscAccount size={30} color='blue' onClick={handleProfile}/></div>
}
      </div>
    </nav>
  );
};

export default Navbar;
