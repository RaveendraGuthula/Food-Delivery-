import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";


const LoginPopup=({setShowLogin})=>{

        const {Url,setToken}=useContext(StoreContext);
// setToken(true);
        const[currState,setCurrState]=useState("Sign Up");
        const[data,setData]=useState({
            name:"",
            email:"",
            password:""
        })

        const onChangeHandler=(e)=>{
            return setData((d)=>({...d,[e.target.name]:e.target.value}));
        }
      


        const requestHandler=async(event)=>{
            event.preventDefault();

            let newUrl=Url;
            if(currState==="Sign Up"){
                newUrl += "/api/user/register"
            }
            else{
                newUrl += "/api/user/signin"
            }


            const response= await axios.post(newUrl,data,
                {
                    headers:{
                        "content-Type":"application/json"
                    }
                }
            );
           
            if(response.data.success){
                setShowLogin(false);
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token)
                toast.success("successfully signup");
            }
            else{
                toast.error(response.data.message);
            }

        }


    return<div className="login-popup">
        <form className="login-popup-container" onSubmit={requestHandler}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""></img>
            </div>
            <div className="login-popup-inputs">
                {currState==="Sign Up"?<input type="text" name="name" onChange={onChangeHandler} placeholder="Your name" required />:<></>
                }
                <input type="email" name="email" onChange={onChangeHandler} placeholder="Your email" required/>
                <input type="password" name="password" onChange={onChangeHandler} placeholder="Password" required/>
            </div>
            <button type={"submit"} >{currState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & provacy policy.</p>
            </div>
            {currState==="Sign Up"
            ?<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>:<p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
            }
        </form>
    </div>
}

export default LoginPopup;