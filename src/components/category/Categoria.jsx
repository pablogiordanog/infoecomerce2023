import {
  faEdit,
  faEye,
  faSync,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { URL_ALL_CATEGORY, URL_CATEGORY } from "../../constants/Contants";
import "./category.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Mensaje from "./Mensaje";

const Categoria = (props) => {
  const { id, name, image, creationAt, updatedAt, option, rol } = props;
  const [nameCategory, setCategory] = useState(name);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  //opcion = 1, es para usar en vista de categorias
  //opcion = 2, es para usar en la edicion, eliminacion de la categoria
  const url_id = URL_CATEGORY + "/" + id; //Usada para Consultar y Eliminar
  const url_id_web = URL_ALL_CATEGORY + id; //Direccion para actualizar y eliminar en la web
  const url_volver = URL_CATEGORY;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [operation, setOperation] = useState(0);//1=borrar, 2=Actualizar
  const handleEjectOperation = () => {
    switch(operation){
      case 1://Borrar
        mutationDeleteCategory.mutate();
        break;

      case 2://Actualizar
        mutationUpdateCategory.mutate({ name: nameCategory });
        break;
    }
  }

  const handleEdit = () => {
    navigate(url_id);
  };
  const handleReturn = () => {
    navigate(url_volver);
  };
  const handleIrAProductos = () => {
    navigate(url_volver);
  };

  const deleteCategory = async () => {
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

  const updateCategory = async ({ name }) => {
    console.log(name);
    console.log(token);
    console.log(JSON.stringify({ name: name }));
    console.log(url_id);
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

  const mutationDeleteCategory = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      alert("Se Ha Eliminado la Categoria.");
      handleReturn();
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + " de Eliminación.");
    },
  });

  const mutationUpdateCategory = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data) => {
      alert("Se Actualizó Correctamente la Categoria.");
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + " de Actualización.");
    },
  });


  return (
    <>
      <div className="col-md-4 d-flex flex-center" key={id}>
        <div className="card p-1 mb-4 shadow-sm">
          <img className="card-img-top" src={image} alt={name} />
          <div className="card-body">
            <p>ID:{id}</p>
            {option == 2 && rol == "admin" ? (
              <input
                type="text"
                value={nameCategory}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="form-control"
                placeholder="Categoria"
              ></input>
            ) : (
              <h6 className="card-text">{name}</h6>
            )}
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
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

                {option == 1 && (
                  <button
                    onClick={() => {
                      handleIrAProductos();
                    }}
                    className="btn btn-sm btn-outline-secondary mr-2"
                  >
                    <FontAwesomeIcon icon={faEye} />
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
          </div>
          {rol == "admin" && (
            <div className="card-footer row">
              <small className="text-muted" style={{ fontSize: "10px" }}>
                Creado:{creationAt}
              </small>
              <small className="text-muted" style={{ fontSize: "10px" }}>
                Actualizado:{updatedAt}
              </small>
            </div>
          )}
        </div>
      </div>
      <Mensaje show={show} 
              handleClose={handleClose}
              operation={operation}
              handleEjectOperation={handleEjectOperation}/>
    </>
  );
};

export default Categoria;
