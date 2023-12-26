import "./products.css";
import { URL_ALL_PRODUCTS } from "../../constants/Contants";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useInfoUser from "../../hook/useInfoUser";

//const INIT_STATE = { data: [], sLoading: false, error: "", isSuccess: false};

/*
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
*/

const AProduct = () => {
  const { id } = useParams();
  const url = URL_ALL_PRODUCTS + id;
  //const { data, isLoading, error, isSuccess } = loadProduct(url);

  const getProduct = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  };

  const query = useQuery({
    queryKey: ["productId"],
    queryFn: () => getProduct(url_id),
  });

  if (query.isLoading) {
    return <h1>Cargando Producto...</h1>;
  }

  if (!query.isSuccess) {
    return <h1>Cargando Producto</h1>;
  }

  if (query.isError) {
    return <h1>Error {query.error.message}</h1>;
  }

  //const rol = "customer";
  //const rol = "admin";
  const { rol } = useInfoUser();

  console.log(query.data);

  const { title, price, description, images, creationAt, updatedAt, category } =
    query.data;

  return (
    <>
      <div id="galeria" className="container">
        <div className="row">
          <Product
            key={id}
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
