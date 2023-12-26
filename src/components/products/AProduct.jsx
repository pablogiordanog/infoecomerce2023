import "./products.css"
import { useEffect, useReducer } from "react";
import { URL_ALL_PRODUCTS } from "../../constants/Contants";
import { useParams } from "react-router-dom";
import Product from "./Product";

const INIT_STATE = { data: [], sLoading: false, error: "", isSuccess: false};

const loadStatus = (state, action) => {
  switch (action.type) {
    case "isSuccess":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
        isSuccess: true,
      };
    case "error":
      return {
        ...state,
        data: [],
        isLoading: true,
        error: action.payload.error,
        isSuccess: false,
      };
    default:
      return state;
  }
};

const loadProduct = (url) => {
  const [state, dispatch] = useReducer(loadStatus, INIT_STATE);
  const { data, isLoading, error, isSuccess } = state;
  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.error) {
          throw new Error("Error cargando datos");
        }
        dispatch({ type: "isSuccess", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: "Error" });
      }
    };
    load();
  }, [url]);
  return { data, isLoading, error, isSuccess };
};

const AProduct = () => {
  const {id} = useParams();

  const url = URL_ALL_PRODUCTS + id
  const { data, isLoading, error, isSuccess } = loadProduct(url);

  if (isLoading) {
    return <h1>Cargando Producto...</h1>;
  }

  if (!isSuccess) {
    return <h1>Cargando Producto...</h1>;
  }

  if (error) {
    return <h1>Error {error}</h1>;
  }

  //const rol = "customer";
  const rol = "admin";
  console.log(url)
  console.log(data)
  const {title,price,description,images,creationAt,updatedAt,category} = data
  return (
    <>
      <div id="galeria" className="container">
        <div className="row">
              <Product
                 id={id}
                 title={title}
                 price={price}
                 description={description}
                 images={images}
                 creationAt={creationAt}
                 updatedAt={updatedAt}
                 category={category}
                 option="2"
                 rol={rol}
              />
        </div>
      </div>
    </>
  );
};

export default AProduct;
