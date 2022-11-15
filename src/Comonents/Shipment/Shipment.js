import React, { useContext } from 'react';
import { UserContext } from '../../App';
import {useForm} from 'react-hook-form'
import { getDatabaseCart, processOrder } from '../../utilities/dataBaseManager';
import "./Shipment.css"

const Shipment = () => {
    const [ loginUser, setLoginUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>{ 
      const sevCart = getDatabaseCart();
        console.log("from submitted",data)
        const orderDetails = {...loginUser, products:sevCart, shipment:data}

        fetch("http://localhost:5000/orderProducts",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(orderDetails)
        })
        .then(res=>res.json())
        .then(result=>{
          console.log("data submitted",result)
          if(result){
            processOrder();
            alert("order placed successfully!!");
          }
        })
    };
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className='ship-from' onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue={loginUser.name} {...register("name", { required: true })} placeholder="your name"/>
        {errors.name && <span className='error'>Name is required</span>}
        <input defaultValue={loginUser.email} {...register("email", { required: true })} placeholder="your email"/>
        {errors.email && <span className='error'>Email is required</span>}
        <input {...register("address", { required: true })} placeholder="your address"/>
        {errors.address && <span className='error'>Address is required</span>}
        <input {...register("phone", { required: true })} placeholder="your phone number"/>
        {errors.phone && <span className='error'>Phone number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;