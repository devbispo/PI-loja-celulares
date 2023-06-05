import React, { useEffect, useState } from "react";
import '../pages/Store.css'

export const Store = () => {
    //inserindo API//
    const [data, setData] = useState ([]);

    useEffect(() => {
        const fetchApi = async() =>{
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular'
            const response = await fetch(url)
            const objJson = await response.json() 
            setData(objJson.results)
    }
    fetchApi();
    }, [])
    /*Api*/
    return (
        <div>
            <h1>Store</h1>
            <div>
                {
                    data.map((e) => (
                        <div key = {e.id}> 
                            <h4>{e.title}</h4>
                            <img src={e.thumbnail} alt=""/>
                        </div>
                    ))
                }
            </div>
            </div>
    )
}