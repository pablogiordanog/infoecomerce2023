import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL_ALL_CATEGORY, URL_ALL_PRODUCTS } from "../../constants/Contants";
import Product from "./Product";
import "./products.css";
//import { useEffect, useReducer } from "react";
import {
  faCertificate,
  faSearch,
  faSortDown,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import useInfoUser from "../../hook/useInfoUser";
import { useEffect, useState } from "react";

/*
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
*/

const getProducts = async () => {
  const res = await fetch(URL_ALL_PRODUCTS);
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
};

const getCategories = async () => {
  const res = await fetch(URL_ALL_CATEGORY);
  const json = await res.json();
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
};

const IndexProducts = () => {
  const [descripArt, setDescripArt] = useState("");
  const [categoriaId, setCategoriaId] = useState({ id: "", category: "" });
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(10000000);
  const [textPrices, setTextPrices] = useState("");

  const [products, setProducts] = useState(null);
  const [productsAux, setProductsAux] = useState([]);
  
  const handleFilterOptions = () => {


  };

  //const { data, isLoading, error, isSuccess } = loadProducts(URL_ALL_PRODUCTS);

  //const rol = "customer";
  const { rol } = useInfoUser();

  const queryProducts = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  
  const queryCategorias = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  if (queryCategorias.isLoading) {
    return <h1>Cargando Categorias...</h1>;
  }

  if (!queryCategorias.isSuccess) {
    return <h1>Cargando Categorias...</h1>;
  }

  if (queryCategorias.isError) {
    return <h1>Error {queryCategorias.error.message}</h1>;
  }

  if (queryProducts.isLoading) {
    return <h1>Cargando Productos...</h1>;
  }

  if (!queryProducts.isSuccess) {
    return <h1>Cargando Productos...</h1>;
  }

  if (queryProducts.isError) {
    return <h1>Error {queryProducts.error.message}</h1>;
  }

  console.log(queryProducts.data)

  //setProducts(queryProducts.data);

  return (
    <section className="section-container bg padding-y">
      <div className="container">
        <div className="row d-flex">
          <aside className="col-sm-4">
            <div className="card card-filter">
              {/*Muestra Politica de Filtros*/}
              <article className="card-grupo-item">
                <header className="card-header">
                  <a href="#"
                    data-toggle="collapse"
                    data-target="#collapse22"
                  >
                    <h6 className="title">Filtros</h6>
                  </a>
                </header>
                <div className="filter-content collapse show" id="collapse22">
                  <div className="card-body">
                    <div className="form-row">
                      <div className="form-row">
                        <p>
                          {descripArt == "" ? "" : `Buscar:${descripArt}`}
                        </p>
                        {descripArt && (
                          <button
                            onClick={() => {
                              setDescripArt("");
                            }}
                            className="btn btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                      </div>

                      <div className="form-row">
                        <p>
                          {categoriaId.id == ""
                            ? ""
                            : `Categoria:${categoriaId.category}`}
                        </p>
                        {categoriaId.id && (
                          <button
                            onClick={() => {
                              setCategoriaId({ id: "", category: "" });
                            }}
                            className="btn btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                      </div>


                      <div className="form-row">
                        <p>{textPrices == "" ? "" : `Rango:${textPrices}`}</p>
                        {textPrices && (
                          <button
                            onClick={() => {
                              setTextPrices("");
                            }}
                            className="btn btn-danger"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
              </article>

              {/*Por Texto-Busqueda*/}
              <article className="card-grupo-item">
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse23">
                    <h6 className="title">Por Descripción</h6>
                  </a>
                </header>
                <div className="filter-content collapse show" id="collapse23">
                  <div className="card-body">
                    <form className="pb-3">
                      <input
                        value={descripArt}
                        onChange={(e) => {
                          setDescripArt(e.target.value);
                          handleFilterOptions();
                        }}
                        className="form-control"
                        placeholder="...buscar"
                        type="text"
                        id="text_filtro"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </article>

              {/*Por Categorias*/}
              <article className="card-grupo-item">
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse44">
                    <h6 className="title">Por Categoria</h6>
                  </a>
                </header>
                <div className="filter-context collapse show" id="collapse44">
                  <div className="card-body">
                    {queryCategorias.data.map((category) => (
                      <form>
                        <label className="form-check">
                          <input
                            className="form-check-input"
                            value={category.id}
                            type="checkbox"
                            onClick={() => {
                              setCategoriaId({
                                id: category.id,
                                category: category.name,
                              });
                              handleFilterOptions();
                            }}
                          />
                          <span className="form-check-label">
                            <span className="float-right badge badge-light round">
                              {category.id}
                            </span>
                            {category.name}
                          </span>
                        </label>
                      </form>
                    ))}
                  </div>
                </div>
              </article>

              {/*Por Precios*/}
              <article className="card-grupo-item">
                <header className="card-header">
                  <a href="#" data-toggle="collapse" data-target="#collapse33">
                    <h6 className="title">Por Precios</h6>
                  </a>
                </header>
                <div className="filter-context collapse show" id="collapse33">
                  <div className="card-body">
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Min.</label>
                        <input
                          onChange={(e) => {
                            setPriceMin(e.target.value);
                          }}
                          className="form-control"
                          placeholder="$1"
                          max={priceMax}
                          type="number"
                          value={priceMin}
                        />
                      </div>

                      <div className="form-group text-right col-md-6">
                        <label>Max.</label>
                        <input
                          onChange={(e) => {
                            setPriceMax(e.target.value);
                          }}
                          className="form-control"
                          placeholder={priceMax}
                          max={priceMax}
                          type="number"
                          value={priceMax}
                        />
                      </div>

                      <button
                        onClick={() => {
                          setTextPrices("$ " + priceMin + " a $ " + priceMax);
                          handleFilterOptions();
                        }}
                        className="btn btn-block btn-outline-primary"
                      >
                        Aplicar Filtro
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </aside>

          <main className="col-sm-8">
            {queryProducts.data.map((products) => (
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
          </main>
        </div>
      </div>
    </section>
  );
};
export default IndexProducts;
