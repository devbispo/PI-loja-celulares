import React, { useEffect, useState } from "react";
import './Store.css';
import { BsFillCartCheckFill, BsFillCartPlusFill } from 'react-icons/bs';
import { getItem, setItem } from "../services/LocalStorageFuncs";
import { Header } from "../compenents/Header";
import { MyCarousel } from "../compenents/MyCarousel";

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);
  //Consumindo a API de celulares do Mercado Livre. 
    useEffect(() => {
        const fetchApi = async () => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
            const response = await fetch(url);
            const objJson = await response.json();
            setData(objJson.results);
        };
        fetchApi();
    }, []);

    const handleClick = (obj) => {
        const element = cart.find((e) => e.id === obj.id);
        if (element) {
            // Se o item já estiver no carrinho, remova-o
            const arrFilter = cart.filter((e) => e.id !== obj.id);
            setCart(arrFilter);
            setItem('carrinhoYt', arrFilter);
        } else {
            // Se o item não estiver no carrinho, adicione-o
            setCart([...cart, obj]);
            setItem('carrinhoYt', [...cart, obj]);
        }
    };

    return (
        <div>
            <Header />
            <div className="ProductArea">
                <MyCarousel />
                {data.map((e) => (
                    <div className="PA" key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt="" />
                        <h4>R$ {e.price}</h4>
                        <button className="btn" onClick={() => handleClick(e)}>
                            {cart.some((itemCart) => itemCart.id === e.id) ? (
                                // Se o item estiver no carrinho, exiba o ícone de carrinho cheio
                                <BsFillCartCheckFill />
                            ) : (
                                // Se o item não estiver no carrinho, exiba o ícone de carrinho vazio
                                <BsFillCartPlusFill />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
