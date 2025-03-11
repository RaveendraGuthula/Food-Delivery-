
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Navbar.css"
import {useContext, useState} from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar=({setShowLogin})=>{

    const[menu,setMenu]=useState("");
    const navigate=useNavigate();
    const{getTotalCartAmount,token,setToken}=useContext(StoreContext);


    const logoutFunction=()=>{
        setToken(false);
        localStorage.removeItem("token");
        navigate("/");
    }

    return<div className="navbar">
            <img src={assets.logo} alt="" className="logo"></img>
            <ul className="navbar-menu">
                <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link >
                <a href="#explore-menu"  onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
                <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
                <a href="#footer" onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt=""></img>
                <div  className="navbar-search-icon" >
                    <img onClick={()=>navigate("/cart")} src={assets.basket_icon} alt=""></img>
                   {getTotalCartAmount()===0?<></>:<div className="dot"></div>
                   } 
                </div>
                {!token
                ?<button onClick={()=>setShowLogin(true)} >sign up</button>
                :<div className="navbar-profile">
                    <img src={assets.profile_icon} alt=""></img>
                    <ul className="nav-profile-dropdown">
                        <li onClick={()=>navigate("/myorders")}>
                            <img src={assets.bag_icon} alt=""></img>
                            <p>Orders</p>
                        </li>
                        <hr></hr>
                        <li>
                            <img src={assets.logout_icon} alt=""
                            ></img>
                            <p onClick={logoutFunction}>Logout</p></li>
                    </ul>    
                </div>}

            </div>
        </div>

}

export default Navbar
