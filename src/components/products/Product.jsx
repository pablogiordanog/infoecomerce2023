import "./products.css";
import { URL_ALL_PRODUCTS, URL_PRODUCTS } from "../../constants/Contants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlusCircle,
  faSync,
  faTrash,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import Mensaje from "./Mensaje";
import useInfoUser from "../../hook/useInfoUser";
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
  const url_id_web = URL_ALL_PRODUCTS + id; //Direccion para actualizar y eliminar en la web
  const url_volver = URL_PRODUCTS;
  const navigate = useNavigate();
  const [productx, setProductx] = useState({title:title,price:price});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [operation, setOperation] = useState(0); //1=borrar, 2=Actualizar
  const handleEjectOperation = () => {
    switch (operation) {
      case 1: //Borrar
        mutationDeleteProduct.mutate();
        break;

      case 2: //Actualizar
        mutationUpdateProduct.mutate({ title: productx.title, price:productx.price });
        break;
    }
  };

  const handleEdit = () => {
    navigate(url_id);
  };

  const handleReturn = () => {
    navigate(url_volver);
  };

  const deleteProduct = async () => {
    const response = await fetch(url_id_web, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  const updateProduct = async ({ title, price }) => {
    const response = await fetch(url_id_web, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, price:price }),
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
    onError: (data) => {
      alert("Error en Operación " + data.message + " de Eliminación.");
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

  const handleAddCard = () =>{
    let {email} = useInfoUser();
    let cantidad = 1;
    let importe = price * cantidad;
    let item = {id:id,
                title:title,
                price:price,
                imagen:images[0],
                cantidad:cantidad,
                importe:importe,
                category:category.name,
              } 
      let itemsShopping = localStorage.getItem(email);        
      if(itemsShopping){
        console.log(itemsShopping)
        let itemsNuevo = itemsShopping ? itemsShopping.split(","):[];
        //let itemsNuevo = JSON.parse(itemsShopping);
        itemsNuevo.push(item);
        localStorage.setItem(email, itemsNuevo);  
      }else{
        localStorage.setItem(email, JSON.stringify(item));      
      }  
  }


  return (
    <>
      <div className="container mt-5 mb-5" key={id}>
        <div className="d-flex justify-content-center row">
          <div className="col-md-10">
            <div className="row p-2 bg-white border rounded">
              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={images[0]}
                />
              </div>
              <div className="col-md-6 mt-1">
                {rol == "admin"?<input type="text" className="form-control" value={productx.title}
                onChange={(e)=>{
                  setProductx({...productx, title:e.target.value})
                }}/>:<h5>{title}</h5>}
                
                <p className="text-justify ">
                  {description}
                  <br />
                </p>
                <div className="d-flex flex-row">
                  {option == 1 && rol == "admin" && (
                    <button
                      onClick={() => {
                        handleEdit();
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                  {option == 2 && rol == "admin" && (
                    <button
                      onClick={() => {
                        setOperation(2);
                        handleShow();
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2"
                    >
                      <FontAwesomeIcon icon={faSync} />
                    </button>
                  )}
                  {option == 2 && rol == "admin" && (
                    <button
                      onClick={() => {
                        setOperation(1);
                        handleShow();
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  )}

                  {option == 2 && (
                    <button
                      onClick={() => {
                        handleReturn();
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2"
                    >
                      <FontAwesomeIcon icon={faReply} />
                    </button>
                  )}
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  {rol == "admin"?<input type="number" className="form-control" value={productx.price}
                onChange={(e)=>{
                  setProductx({...productx, price:e.target.value})
                }}/>:<h4 className="mr-1">$ {price}</h4>}

                </div>
                <h6 className="text-success">{category.name}</h6>
                <div className="d-flex flex-column mt-4">
                  <button onClick={()=>{handleAddCard()}}
                    className="btn btn-outline-primary btn-sm mt-2"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} /> al Carrito
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mensaje
        show={show}
        handleClose={handleClose}
        operation={operation}
        handleEjectOperation={handleEjectOperation}
      />
    </>
  );
};

export default Product;
