import React, { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/FireBaseConfig";
import { Header } from "../compenents/Header";
import UserContext from "../contexts/UserContext";

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "carrinhoYt");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
        setOrders(ordersData);
      } catch (error) {
        console.error("Erro ao buscar as compras do Firestore:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className="ProductArea">
      <p><h2>Histórico de Compras</h2></p>
      </div>
      <div className="ProductArea">
      {orders.length === 0 ? (
          <p>Não há compras registradas.</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                <h3>Compra #{index + 1}</h3>
                <h4>Itens:</h4>
                
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <p>{item.title}</p>
                      <img src={item.thumbnail} alt={item.title} />
                      <p>Preço: R$ {item.price}</p>
                    </li>
                  ))}
                </ul>
                <h4>Subtotal: R$ {order.subtotal}</h4>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
