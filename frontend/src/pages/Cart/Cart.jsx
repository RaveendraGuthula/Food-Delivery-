import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Cart=()=>{

    const{cartItems,food_list,removeFromCart,getTotalCartAmount,Url}=useContext(StoreContext);

    const navigate=useNavigate();

    return<div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map((obj,index)=>{
                    if(cartItems[obj._id]>0){
                        return <div key={index}>
                                <div className="cart-items-title cart-items-item" > 
                                <img src={Url+"/images/"+obj.image} alt="" />
                                <p>{obj.name}</p>
                                <p>${obj.price}</p>
                                <p>{cartItems[obj._id]}</p>
                                <p>${obj.price*cartItems[obj._id]}</p>
                                <p onClick={()=>removeFromCart(obj._id)} className="cross">x</p>
                                </div>
                                <hr></hr>
                            </div>
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                    <button onClick={()=>navigate("/order")}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you hve a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="promo code"></input>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
}

export default Cart;