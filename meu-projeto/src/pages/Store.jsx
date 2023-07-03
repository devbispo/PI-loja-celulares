import React, { useEffect, useState } from "react";
import './Store.css';
import { BsFillCartCheckFill, BsFillCartPlusFill } from 'react-icons/bs';
import { getItem, setItem } from "../services/LocalStorageFuncs";
import { Header } from "../compenents/Header";
import { MyCarousel } from "../compenents/MyCarousel";
import { db } from "../services/FireBaseConfig";
import { addDoc, collection, deleteDoc, getDocs, doc } from "firebase/firestore";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem('carrinhoYt') || []);

  useEffect(() => {
    const fetchApi = async () => {
      const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartCollection = collection(db, "carrinhoYt");
      const cartSnapshot = await getDocs(cartCollection);
      const cartItems = cartSnapshot.docs.map((doc) => doc.data());
      setCart(cartItems);
    };

    fetchCartItems();
  }, []);

  const handleAddToCart = async (obj) => {
    const updatedCart = [...cart, obj];
    setCart(updatedCart);
    setItem("carrinhoYt", updatedCart);

    // Adicione o item ao Firestore
    await addDoc(collection(db, "carrinhoYt"), obj);
  };

  const handleRemoveFromCart = async (obj) => {
    const updatedCart = cart.filter((e) => e.id !== obj.id);
    setCart(updatedCart);
    setItem("carrinhoYt", updatedCart);

    // Remova o item do Firestore
    await deleteDoc(doc(db, "carrinhoYt", obj.id));
  };

  const isInCart = (itemId) => {
    return cart.some((itemCart) => itemCart.id === itemId);
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

            <button
              className="btn"
              onClick={() => {
                if (isInCart(e.id)) {
                  handleRemoveFromCart(e);
                } else {
                  handleAddToCart(e);
                }
              }}
            >
              {isInCart(e.id) ? (
                <BsFillCartCheckFill />
              ) : (
                <BsFillCartPlusFill />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
