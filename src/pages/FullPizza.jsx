import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza = () => {
  const {id} = useParams(); 
  const naigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(()=>{
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://67ee8820c11d5ff4bf79f1be.mockapi.io/items/' + id); 
        setPizza(data);
      } catch (error) {
        alert('Error , pizza not found!');
        naigate('/');
      }
    }
    fetchPizza();
  },[])

  if (!pizza) {
    return 'Загрузка...';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizza;