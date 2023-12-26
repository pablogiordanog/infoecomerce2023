import { URL_ALL_PRODUCTS } from "../../constants/Contants";
import Product from "./Product";
import "./products.css"
import { useEffect, useReducer } from "react";

const INIT_STATE = { data: [], isLoading: false, error: "", isSuccess: false };

const loadStatus = (state: any, action: any) => {
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

const loadProducts = (url: string) => {
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
        console.log(data);
        dispatch({ type: "isSuccess", payload: data });
      } catch (error) {
        dispatch({ type: "error", payload: "Error" });
      }
    };
    load();
  }, [url]);
  return { data, isLoading, error, isSuccess };
};

const IndexProducts = () => {
  const { data, isLoading, error, isSuccess } = loadProducts(URL_ALL_PRODUCTS);

  console.log(isLoading);

  if (isLoading) {
    return <h1>Cargando Productos...</h1>;
  }

  if (!isSuccess) {
    return <h1>Cargando Productos...</h1>;
  }

  if (error) {
    return <h1>Error {error}</h1>;
  }

  //const rol = "customer";
  const rol = "admin";
  

  return (
    <div id="galeria" className="container">
      <div className="row">
        {data.map((products: any) => (
            <Product
              id={products.id}
              title={products.title}
              price={products.price}
              description={products.description}
              images={products.images}
              creationAt={products.creationAt}
              updatedAt={products.updatedAt}
              category={products.category}
              option="1"
              rol={rol}
            />
        ))}
      </div>
    </div>
  )
}
export default IndexProducts


