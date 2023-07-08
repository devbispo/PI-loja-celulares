import "../pages/Cart.css";
import React, { useState, useEffect } from "react";
import { getItem, setItem } from "../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { Header } from "../compenents/Header";
import { db } from "../services/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const Cart = () => {
  const [data, setData] = useState(getItem("carrinhoYt") || []);
  const [purchaseComplete, setPurchaseComplete] = useState(false); 

  useEffect(() => {
    setData(getItem("carrinhoYt") || []);
  }, []);

  const removeItem = (obj) => {
    const arrFilter = data.filter((e) => e.id !== obj.id);
    setData(arrFilter);
    setItem("carrinhoYt", arrFilter);
  };

  const subTotal = data.reduce((acc, cur) => acc + cur.price, 0);

  const handleCheckout = async () => {
    try {
      const cartCollection = collection(db, "carrinhoYt");
      const itemsToAdd = data.map((item) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        price: item.price,
      }));
      
      const subtotal = data.reduce((acc, cur) => acc + cur.price, 0);
      const orderData = { items: itemsToAdd, subtotal };
      
      await addDoc(cartCollection, orderData);
      
      console.log("Itens adicionados ao Firestore com sucesso!");

      setItem("carrinhoYt", []);
      setData([]);
      setPurchaseComplete(true); // Atualiza o estado para indicar que a compra foi realizada

    } catch (error) {
      console.error("Erro ao adicionar itens ao Firestore:", error);
    }
  };

  return (
    <div>
      <div>
        <Header />

        <div className="ProductArea">
          {data.length === 0 ? (
            <p className="carrinho">
              <h1>Carrinho vazio</h1>
              {purchaseComplete && <p>Compra realizada com sucesso!</p>} 
            </p>
          ) : (
            data.map((e) => (
              <div className="PA" key={e.id}>
                <h4>{e.title}</h4>
                <img src={e.thumbnail} alt={e.title} />
                <h4>R$ {e.price}</h4>
                <button className="btn" onClick={() => removeItem(e)}>
                  <BsFillCartDashFill />
                </button>
              </div>
            ))
          )}
        </div>
        <h3 className="COLOR">{`Valor total : R$ ${subTotal}`}</h3>
      
        <button className="onClick" onClick={handleCheckout} disabled={data.length === 0}>
          Finalizar compra
        </button>

        
      </div>
    </div>
  );
};
