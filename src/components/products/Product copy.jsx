import "./products.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { URL_PRODUCTS } from "../../constants/Contants";
import { Link } from "react-router-dom";
const Product = (props) => {
  const {
    id,
    title,
    price,
    description,
    images,
    creationAt,
    updatedAt,
    category,
    option,
    rol,
  } = props;

  //opcion = 1, es para usar en vista de producto
  //opcion = 2, es para usar en la edicion, eliminacion producto
  const url_id = URL_PRODUCTS + "/" + id;
  const url_volver = URL_PRODUCTS;
  const [titleNew, setTitleNew] = useState("");
  const [priceNew, setPriceNew] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*
  const [operation, setOperation] = useState(0); //1=borrar, 2=Actualizar
  const handleEjectOperation = () => {
    switch (operation) {
      case 1: //Borrar
        mutationDeleteProduct.mutate();
        break;

      case 2: //Actualizar
        mutationUpdateProduct.mutate({ name: nameCategory });
        break;
    }
  };

  const handleReturn = () => {
    navigate(url_volver);
  };

  const deleteProduct = async () => {
    const response = await fetch(url_id_web, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  const updateProduct = async ({ name }) => {
    const response = await fetch(url_id_web, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  const mutationDeleteProduct = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      alert("Se Ha Eliminado el Producto.");
      handleReturn();
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + " de Eliminación.");
    },
  });

  const mutationUpdateProduct = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      alert("Se Actualizó Correctamente el Producto.");
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + " de Actualización.");
    },
  });
  */

  //console.log(category)
  //console.log(images)

  return (
    <>
      <div className="container mt-5 mb-5" key={id}>
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src="..."
                />
              </div>
              <div className="col-md-6 mt-1">
                <h5>{title}</h5>
                <p className="text-justify ">
                  {description}
                  <br />
                </p>
                <div className="d-flex flex-row">
                  {option == 1 && rol == "admin" && (
                    <a className="btn btn-outline-info btn-sm mr-2">
                      <Link to={url_id}>Detalle</Link>
                    </a>
                  )}
                  {option == 2 && rol == "admin" && (
                    <a className="btn btn-outline-info btn-sm mr-2">
                      <Link to={url_id}>Actualizar</Link>
                    </a>
                  )}
                  {option == 2 && rol == "admin" && (
                    <a className="btn btn-outline-info btn-sm mr-2">
                      <Link to={url_id}>Eliminar</Link>
                    </a>
                  )}
                  {option == 2 && (
                    <a className="btn btn-outline-info btn-sm mr-2">
                      <Link to={url_volver}>Volver</Link>
                    </a>
                  )}
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${price}</h4>
                </div>
                <h6 className="text-success">{category}</h6>
                <div className="d-flex flex-column mt-4">
                  <button
                    className="btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
