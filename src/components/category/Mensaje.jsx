import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Mensaje = ({
  show,
  handleClose,
  operation,
  handleEjectOperation,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {operation == 1 ? "Eliminar" : "Actualizar"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Desea {operation == 1 ? " Eliminar " : " Actualizar "} la Categoria?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleEjectOperation();
              handleClose();
            }}
          >
            Si
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Mensaje;
