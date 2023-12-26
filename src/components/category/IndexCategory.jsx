import "./category.css";
import { URL_ALL_CATEGORY } from "../../constants/Contants";
import Categoria from "./Categoria";
import { useQuery } from "@tanstack/react-query";
import useInfoUser from "../../hook/useInfoUser";
import NewCategory from "./NewCategory";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

/*
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

const loadCategoty = (url: string) => {
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
*/

const getCategories = async () => {
  const res = await fetch(URL_ALL_CATEGORY);
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
};

const IndexCategory = () => {
  /*const { data, isLoading, error, isSuccess } = loadCategoty(URL_ALL_CATEGORY);
  console.log(isLoading);
  */

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const { rol } = useInfoUser();

  const query = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  console.log(query);

  if (query.isLoading) {
    return <h1>Cargando Categorias...</h1>;
  }

  if (!query.isSuccess) {
    return <h1>Cargando Categorias...</h1>;
  }

  if (query.isError) {
    return <h1>Error {query.error.message}</h1>;
  }

  
  return (
    <>
      <div className="container px-0">
        <main role="main">
          <div className="album bg-light">
            <br />
            
            <h3 className="jumbotron-heading text-center">
              {rol=="admin" && <button onClick={handleShow} className="btn btn-primary"><FontAwesomeIcon icon={faPlusCircle} /></button>} Todas las Categorias
            </h3>

            <div className="container">
              <div className="row grap-4">
                {query.data.map((category) => (
                  <Categoria
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    image={category.image}
                    creationAt={new Date(category.creationAt).toLocaleString()}
                    updatedAt={new Date(category.updatedAt).toLocaleString()}
                    option="1"
                    rol={rol}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <NewCategory show={show} handleClose={handleClose} />
    </>
  );
};

export default IndexCategory;
