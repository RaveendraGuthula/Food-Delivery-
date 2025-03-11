import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import  {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder=({setShowLogin})=>{
    const{getTotalCartAmount,token,food_list,cartItems,Url}=useContext(StoreContext);
    const navigate=useNavigate();

    const [data,setData]= useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    });

    const onChangeHandler=(event)=>{
        return setData((prev)=>({...prev,[event.target.name]:event.target.value}));
    }
   
    const onSubmitHandler=async(event)=>{
        event.preventDefault();

        let orderItems=[];
        
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
           
        })


        const response= await axios.post(`${Url}/api/order/place`,
            {
                items:orderItems,
                amount:getTotalCartAmount()+2,
                address:data
            },
            {
                headers:{
                    "content-Type":"application/json",
                    "authentication":token
                }
            })
            
            if(response.data.success){
                // window.location.replace();
                navigate("/myorders");
                toast.success(response.data.message);
            }
            else{
                toast.error("Error");
            }
        }


        useEffect(()=>{
            if(!token){
                setShowLogin(true);
                navigate("/cart");
            }
        },[token]);
        

    return<div>
            <form className="place-order" onSubmit={onSubmitHandler}>
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input  type="text" placeholder="First Name"  required name="firstName" onChange={onChangeHandler}/>
                        <input type="text" placeholder="Last name"  required name="lastName" onChange={onChangeHandler}/>
                    </div>
                    <input type="email" placeholder="Email address" required name="email" onChange={onChangeHandler}/>
                    <input type="text" placeholder="Street" required name="street" onChange={onChangeHandler}/>
                    <div className="multi-fields">
                        <input type="text" placeholder="City" required name="city" onChange={onChangeHandler} />
                        <input type="text" placeholder="State"  required name="state" onChange={onChangeHandler}/>
                    </div>
                    <div className="multi-fields">
                        <input type="text" placeholder="Zip code" required name="zipcode" onChange={onChangeHandler}/>
                        <input type="text" placeholder="Country" required name="country" onChange={onChangeHandler}/>
                    </div>
                    <input type="text" placeholder="Phone" required name="phone" onChange={onChangeHandler}></input>
                </div>

                <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart totals</h2>
                    <div>
                    <div className="cart-total-details">
                            <p>subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount()>0?2:0}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount()>0?getTotalCartAmount()+2:0}</b>
                        </div>
                    </div>
                    <button type="submit" >PROCEED TO PAYMENT</button>
                </div>
                </div>
            </form>

    </div>
}

export default PlaceOrder;