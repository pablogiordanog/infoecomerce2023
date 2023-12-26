import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { URL_ALL_USERS, URL_USER } from "../../constants/Contants";

const NewUser = ({ show, handleClose }) => {
  const [user, setUser] = useState({ name: "", email: "" , password:"", avatar:""});
  const navigate = useNavigate();
  const newUserMutable = async ({ name, email, password, avatar }) => {
    const response = await fetch(URL_ALL_USERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password, avatar:avatar }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  const mutationNewUser = useMutation({
    mutationFn: newUserMutable,
    onSuccess: (data) => {
      alert("Se Ingreso Nuevo Usuario.");
      setUser({ name: "", email: "" , password:"", avatar:""});
      handleClose();
    },
    onError: (dala) => {
      alert("Error en Operación " + dala.message + ".");
    },
  });

  const handleNewUser = () => {
    mutationNewUser.mutate({ "name": user.name, "email": user.email, "password":user.password, "avatar":user.avatar });
    navigate(URL_USER);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-50">
            <div className="form-group">
                <input value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }} type="text" className="form-control" placeholder="Nombre de Usuario" required/>
            </div>

            <div className="form-group">
                <input value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }} type="email" className="form-control" placeholder="E-Mail" required/>
            </div>

            <div className="form-group">
                <input value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }} type="password" className="form-control" placeholder="" required/>
            </div>

            <div className="form-group">
                <input value={user.avatar}
                onChange={(e) => {
                  setUser({ ...user, avatar: e.target.value });
                }} type="text" className="form-control" placeholder="Ingrese la dirección de Imagen" required/>
            </div>

          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handleNewUser();
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

export default NewUser;
