import React, { useState, useEffect } from "react";
import "../pages/Cart.css";
import { getItem, setItem } from "../services/LocalStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { Header } from "../compenents/Header";
import { db } from "../services/FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useHistory } from "react-router-dom";

export const Cart = () => {
  const [data, setData] = useState(getItem("carrinhoYt") || []);
  const history = useHistory();

  useEffect(() => {
    setData(getItem("carrinhoYt") || []);
  }, []);

  // Função para remover um item do carrinho
  const removeItem = (obj) => {
    const arrFilter = data.filter((e) => e.id !== obj.id);
    setData(arrFilter);
    setItem("carrinhoYt", arrFilter);
  };

  // Cálculo do valor total do carrinho
  const subTotal = data.reduce((acc, cur) => acc + cur.price, 0);

  // Função para adicionar os itens ao Firestore e finalizar a compra
  const handleCheckout = async () => {
    try {
      const cartCollection = collection(db, "carrinhoYt");
      for (const item of data) {
        await addDoc(cartCollection, item);
      }
      console.log("Itens adicionados ao Firestore com sucesso!");

      // Limpar o carrinho local após adicionar ao Firestore
      setItem("carrinhoYt", []);
      setData([]);

      if (data.length > 0) {
        // Exibir alerta apenas se o carrinho não estiver vazio
        alert("Compra realizada com sucesso!");

        // Redirecionar para a página Store após compra ser finalizada.
        history.push("/store");
      }
    } catch (error) {
      console.error("Erro ao adicionar itens ao Firestore:", error);
      // Lidar com o erro de adição ao Firestore aqui
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
        <button className="onClick" onClick={handleCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};
