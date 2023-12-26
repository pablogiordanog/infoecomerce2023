import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Card = () => {
  return (
    <>
      <>
        <div className="card-body">
          <p className="notification">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="badge">4</span>
          </p>
        </div>
      </>  
    </>
  );
};

export default Card;
