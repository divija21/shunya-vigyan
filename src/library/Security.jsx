import React from 'react'
import { Navigate } from 'react-router-dom';

const Security = ({Child}) => {
    let verify = ()=>{
        let x = JSON.parse(localStorage.getItem("libuser"));
        if(x==null){
            return false
        }
        else{
            return true;
        }
    }
  return (
    <div>
        {verify()?<Child/>:<Navigate to="/login"/>}
    </div>
  )
}

export default Security