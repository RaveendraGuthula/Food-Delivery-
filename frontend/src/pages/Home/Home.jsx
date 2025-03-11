import "./Home.css";
import Header from "../../components/Header/Header"
import ExplorMenu from "../../components/ExploreMenu/ExploreMenu";
import { useState } from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home=()=>{
    const[category,setCategory]=useState("All");
    return<div>
            <Header/>
            <ExplorMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category}/>
            <AppDownload></AppDownload>
        </div>
}   

export default Home;