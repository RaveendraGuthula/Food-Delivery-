import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay=({category})=>{

    const {food_list}=useContext(StoreContext);

    return<div className="food-display" id="food-display">
            <h2>Top dishes near you </h2>
            <div className="food-display-list">
                {food_list.map((obj)=>{
                    if(category==="All" ||category===obj.category){
                        
                        return<FoodItem key={obj._id} id={obj._id} name={obj.name} price={obj.price} description={obj.description} image={obj.image}/>
                    }
                })}
            </div>
          </div> 
}

export default FoodDisplay;