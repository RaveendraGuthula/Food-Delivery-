import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

const ExplorMenu=({category,setCategory})=>{
    return<div>
            <div className="explore-menu" id="explore-menu">

                <h1>Explore our menu</h1>

                <p className="explore-menu-text">Choose from  diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time. </p>

                <div className="explore-menu-list">

                    {menu_list.map((obj,index)=>{

                         return<div onClick={()=>setCategory((prev)=>prev===obj.menu_name?"All":obj.menu_name)} key={index}  className="explore-menu-list-item">
                                    
                                <img className={category===obj.menu_name?"active":""} src={obj.menu_image} alt=""></img>

                                <div>{obj.menu_name}</div>

                        </div> 
                    }
                    )}

                </div>
                <hr></hr>
            </div>
        </div>
}

export default ExplorMenu;