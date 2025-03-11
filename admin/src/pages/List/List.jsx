import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css"
const List=({Url})=>{

    const [list,setList]=useState([]);
    


    //list end point function 
    async function grabList(){
    const response = await axios.get(`${Url}/api/food/list`);
    
    if(response.data.success){
        setList(response.data.data);
    }
    else{
        toast.error("Error")
    }
 }

// hitting the list end point
    useEffect(()=>{
    //  setInterval(()=>grabList(),5000);
    grabList();
    },[]);


    //remove end point function
    const removeItem=async(id)=>{

    const response= await axios.post(`${Url}/api/food/remove`,{
        id
    },
    {
        headers:{
            "Content-Type":"Application/json"

        }
    }
        );

        await grabList();
        
        if(response.data.success){
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
        
    }


    return<div className="list add flex-col">
        <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format  title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item)=><div key={item._id}className="list-table-format">
                    <img src={`${Url}/images/${item.image}`} alt=""></img>
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p className="cursor" onClick={()=>removeItem(item._id)}>X</p>
                </div>)}
            </div>
    </div>
}

export default List;