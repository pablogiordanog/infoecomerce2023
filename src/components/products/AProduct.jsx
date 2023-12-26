import "./products.css";
import { URL_ALL_PRODUCTS } from "../../constants/Contants";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useInfoUser from "../../hook/useInfoUser";

const AProduct = () => {
  const { id } = useParams();
  const url_id = URL_ALL_PRODUCTS + id;

  const getProducts = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  };

  const query = useQuery({
    queryKey: ["prodId"],
    queryFn: () => getProducts(url_id),
  });

  if (query.isLoading) {
    return <h1>Cargando Producto...</h1>;
  }

  if (!query.isSuccess) {
    return <h1>Cargando Producto...</h1>;
  }

  if (query.isError) {
    return <h1>Error {query.error.message}</h1>;
  }

  //const rol = "customer";
  const { rol } = useInfoUser();

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
