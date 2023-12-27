import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ListItems from "./ListItems";
import { useState } from "react";
import useInfoUser from "../../hook/useInfoUser";

const Card = () => {
  const [count, setCount] = useState(0);

  const handleCardList = () => {
    return (
      <>
        <ListItems />
      </>
    );
  };

  const getItems = () => {
    const { email } = useInfoUser();
    const items = JSON.parse(localStorage.getItem(email));
    console.log(items)
    items.map((i)=>(
        console.log(i.id)
    ));
    
  




    setCount(data);
  };

  return (
      
      <>
        <div className="card-body">
          <p className="notification">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="badge">{count}</span>
            <button onClick={getItems}>Ver</button>
          </p>
        </div>
      </>
  );
};

export default Card;
