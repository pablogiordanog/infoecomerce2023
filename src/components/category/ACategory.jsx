import "./category.css"
import { URL_ALL_CATEGORY } from "../../constants/Contants";
import Categoria from "./Categoria";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

/*
//import { useEffect, useReducer } from "react";

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


const ACategory = () => {
  const {id} = useParams();
  const url_id = URL_ALL_CATEGORY + id;
  //const { data, isLoading, error, isSuccess } = loadCategoty(URL_ALL_CATEGORY + id);

  const getCategory = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    if(json.error){
      throw new Error(json.error);
    }
    return json;
  }

  const query = useQuery({
    queryKey: ["categoryId"],
    queryFn: () => getCategory(url_id),
  });


  if (query.isLoading) {
    return <h1>Cargando Categoria...</h1>;
  }

  if (!query.isSuccess) {
    return <h1>Cargando Categoria...</h1>;
  }

  if (query.isError) {
    return <h1>Error {query.error.message}</h1>;
  }

  //const rol = "customer";
  const rol = "admin";
  
  
  const {name,image,creationAt,updatedAt} = query.data

  return (
    <>
      <div id="galeria" className="container">
        <div className="row">
              <Categoria
                id={id}
                name={name}
                image={image}
                creationAt={new Date(creationAt).toLocaleString()}
                updatedAt={new Date(updatedAt).toLocaleString()}
                option="2"
                rol={rol}
              />
        </div>
      </div>
    </>
  );
};

export default ACategory;
