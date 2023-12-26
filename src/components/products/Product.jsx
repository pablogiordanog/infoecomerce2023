import "./products.css";
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
                <h5>{title}</h5>
                <p className="text-justify ">
                  {description}
                  <br />
                </p>
                <div className="d-flex flex-row">
                
                  {option == 1 && rol == "admin" && <a className="btn btn-outline-info btn-sm mr-2"><Link to={url_id}>Detalle</Link></a>}
                  {option == 2 && rol == "admin" && <a className="btn btn-outline-info btn-sm mr-2"><Link to={url_id}>Actualizar</Link></a>}
                  {option == 2 && rol == "admin" && <a className="btn btn-outline-info btn-sm mr-2"><Link to={url_id}>Eliminar</Link></a>}
                  {option == 2 && <a className="btn btn-outline-info btn-sm mr-2"><Link to={url_volver}>Volver</Link></a>}
                </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">${price}</h4>
                </div>
                <h6 className="text-success">{category.name}</h6>
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
