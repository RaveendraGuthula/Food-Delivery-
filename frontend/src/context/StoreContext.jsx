import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext=createContext(null);

const StoreContextProvider=({children})=>{

    const[cartItems,setCartItems]=useState({});
    
    const[food_list,setFood_list]=useState([]);


    const grabList=async()=>{
        const response= await axios.get(`${Url}/api/food/list`);
            setFood_list(response.data.data);
    }

    
    const addToCart=async(itemId)=>{
        if(!cartItems[itemId]){
                setCartItems(prev=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){        
            await axios.put(Url+"/api/cart/add",
                {
                foodId:itemId
                },
                {
                    headers:{
                      "content-Type":"application/json",
                      "authentication":token
                    }
                }
            )
        }
    }
            
    const removeFromCart=async(itemId)=>{

        setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1}));

        if(token){        
            await axios.post(Url+"/api/cart/remove",
                {
                foodId:itemId
                },
                {
                    headers:{
                    "Content-Type":"application/json",
                    "authentication":token
                    }
                }
            )
        }
    }
            
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((i)=>i._id===item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const Url="http://localhost:3000";


    const[token,setToken]=useState(false);


    const cartData=async(token)=>{
        const response=await axios.post(Url+"/api/cart/get",{},
            {
                headers:{
                    "Content-Type":"application/json",
                    "authentication":token
                }
            }
        )

        setCartItems(response.data.cartData);

    }

    useEffect(()=>{

        async function loadData(){

            await grabList();

            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await cartData(localStorage.getItem("token"));
            }

        }

        loadData();

    },[])

    const contextValue= {food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCartAmount,Url,token,setToken};

    return<StoreContext.Provider value={contextValue}>
        {children}
    </StoreContext.Provider>
} 

export default StoreContextProvider;