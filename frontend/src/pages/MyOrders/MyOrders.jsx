import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";

  
const MyOrders = ()=>{

    const[data,setData]=useState([]);
    const {Url,token}=useContext(StoreContext);

    const userorders = async()=>{
        const response = await axios.post(`${Url}/api/order/userorders`,
            {},
            {
                headers:{
                    "content-Type":"application/json",
                    "authentication":token
                }
            });

        if(response.data.success){
            setData(response.data.data);
        }

    }

    useEffect(()=>{
        if(token){
            userorders();
        }
    },[token])
 

    return <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt=""></img>
                            <p>{order.items.map((item,index)=>{
                                if(index===order.items.length-1){
                                    return item.name+" x "+item.quantity;
                                }
                                else{
                                    return item.name+" x "+ item.quantity+" , "
                                }
                            })}</p>
                            <p>${order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={userorders}>Track Order</button>
                </div>
            })}
        </div>
    </div>
}

export default MyOrders;