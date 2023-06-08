import React, { useState } from "react";
import '../pages/Cart.css'
import { getItem, setItem } from "../services/LocalStorageFuncs";
import {BsFillCartDashFill} from 'react-icons/bs'
import { Header } from "../compenents/Header";

export const Cart = () => {
    const [data , setData] = useState(getItem ('carrinhoYt') || [])
    const removeItem = (obj) =>{
        const arrFilter = data.filter((e)=>e.id !== obj.id)
        setData(arrFilter)
        setItem('carrinhoYt', arrFilter)
    }

    const subTotal = data.reduce ((acc, cur)=> acc + cur.price, 0)
    return(
        <div>
        <div>
            <Header/>
            <h3>{`Subtotal : R$ ${subTotal}`}</h3>
            <div className="ProductArea">
                {data.length === 0 ? (
          <p className="carrinho"><h1>Carrinho vazio</h1></p>
        ) : (
                    data.map((e) => (
                        <div className="PA" key= {e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt={e.title}/>
                        <h4>R$ {e.price}</h4>
                        <button className="btn"
                        onClick={() => removeItem(e)}>
                            <BsFillCartDashFill />
                        </button>
                        </div>
                  ))
                  )}
            </div>
        </div>
        </div>
    
    )
}