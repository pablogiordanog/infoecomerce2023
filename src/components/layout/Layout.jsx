import "./layout.css";
import { Outlet, Link } from "react-router-dom";
import {
  URL_HOME,
  URL_CATEGORY,
  URL_PRODUCTS,
  URL_ABOUT,
} from "../../constants/Contants";
import InfoUser from "../infouser/InfoUser";
import Card from "../card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import useInfoUser from "../../hook/useInfoUser";


const Menu = () => {
  const { email, rol } = useInfoUser();
  console.log("Menu")
  //console.log(user)
  //const { email } = user;
  console.log(email);
  console.log(rol)

  return (
    <div className="container pt-5 mt-5 mx-auto" style={{width:"100%"}}>
      <div className="container-fluid pt-5 px-1 my-3 mx-auto border" style={{width:"100%"}}>
        <nav className="navbar navbar-main navbar-expand-lg navbar-light bg-light fixed-top">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand">
            <FontAwesomeIcon icon={faStore} />
            <small><Link to={URL_HOME}>E-commerce</Link></small>
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav navbar-left mr-auto mt-4 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link">
                  <Link to={URL_CATEGORY}>Catetorias</Link>
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to={URL_PRODUCTS}>Productos</Link>
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <Link to={URL_ABOUT}>Acerca de...</Link>
                  <span className="sr-only">(current)</span>
                </a>
              </li>
            </ul>

            <ul className="nav navbar-nav navbar-center">
              <li>
                <form className="form-inline">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="...buscar aquí"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-outline-success my-2 my-sm-0 mr-2"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </li>
            </ul>

            <div className="my-2 my-lg-0 mr-2">
              <p>
                <Card />
              </p>
            </div>

            <div className="my-2 my-lg-0 mr-4">
                <InfoUser />
            </div>
          </div>
        </nav>
        <br />
        <Outlet />
      </div>
    </div>  
  );
};

export default Menu;
