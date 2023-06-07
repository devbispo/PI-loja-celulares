import React, { useState } from "react";
import '../pages/Cart.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getItem, setItem } from "../services/LocalStorageFuncs";
import {BsFillCartDashFill} from 'react-icons/bs'

export const Cart = () => {
    const [data , setData] = useState(getItem ('carrinhoYt') || [])
    const removeItem = (obj) =>{
        const arrFilter = data.filter((e)=>e.id !== obj.id)
        setData(arrFilter)
        setItem('carrinhoYt', arrFilter)
    }
    return(
        <div>
        <Link to ="/">Store</Link>
        <div>
            <h1>Cart</h1>
            <div className="ProductArea">
                {
                    data.map((e) => (
                        <div className="PA" key= {e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt={e.title}/>
                        <h4>{e.price}</h4>
                        <button className="btn"
                        onClick={() => removeItem(e)}>
                            <BsFillCartDashFill />
                        </button>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
    
    )
}