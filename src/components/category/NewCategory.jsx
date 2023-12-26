import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { URL_ALL_CATEGORY, URL_CATEGORY } from "../../constants/Contants";

const NewCategory = ({ show, handleClose }) => {
  const [categoria, setCategoria] = useState({ name: "", image: "" });
  const navigate = useNavigate();
  const nuevaCategory = async ({ name, image }) => {
    const response = await fetch(URL_ALL_CATEGORY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, image: image }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  const mutationNewCategory = useMutation({
    mutationFn: nuevaCategory,
    onSuccess: (data) => {
      alert("Se Ingreso una Nueva Categoria.");
      setCategoria({ name: "", image: "" });
      handleClose();
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + ".");
    },
  });

  const handleNewCategory = () => {
    mutationNewCategory.mutate({ "name": categoria.name, "image": categoria.image });
    navigate(URL_CATEGORY);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nueva Categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-50">
            <div className="form-group">
                <input value={categoria.name}
                onChange={(e) => {
                  setCategoria({ ...categoria, name: e.target.value });
                }} type="text" className="form-control" placeholder="Nueva Categoria" required/>
            </div>

            <div className="form-group">
                <input value={categoria.image}
                onChange={(e) => {
                  setCategoria({ ...categoria, image: e.target.value });
                }} type="text" className="form-control" placeholder="Ingrese la dirección de Imagen" required/>
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handleNewCategory();
            handleClose();
          }}
        >
          Ingresar
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCategory;
