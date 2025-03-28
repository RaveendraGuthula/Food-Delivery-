import "./add.css"
import { assets } from "../../assets/assets";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Add=({Url})=>{

    const [image,setImage]=useState(false);
    const [data,setData]=useState({name:"",description:"",category:"Salad",price:""})


    const onChangeHandler=(e)=>setData(d=>({...d,[e.target.name]:e.target.value}));

    const onSubmitRequest=async(event)=>{
        event.preventDefault(); //it helps to stop reload after click the submit button (ADD) in the bowser 

        const response=await axios.post(`${Url}/api/food/add`,
        {
            name:data.name,
            description:data.description,
            category:data.category,
            price:Number(data.price),
            image},
            {
                headers:{
                    "content-Type":"multipart/form-data"
                }
            }
        )
        if(response.data.success){
            setData({
                name:"",
                description:"",
                category:"Salad",
                price:""
            });
            setImage(false);
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }
    }

    const hello=()=>toast.success("hello")

    return<div className="add">
            <form className="flex-col" onSubmit={onSubmitRequest}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id="image" hidden required></input>
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" onChange={onChangeHandler} value={data.name} name="name" placeholder="Type here"></input>
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder="write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col"> 
                        <p>Product category</p>
                        <select name="category" onChange={onChangeHandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="Number" name="price" placeholder="$20" onChange={onChangeHandler} value={data.price} />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
    </div>
}

export default Add;