import "./infouser.css";
import useAuth from "../../hook/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useInfoUser from "../../hook/useInfoUser";

const InfoUser = () => {
  const { handleLogout } = useAuth();
  const {email} = useInfoUser();

  return (
    <div>
      <a
        className="nav-link dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="chip">
          <FontAwesomeIcon icon={faUser}>
            <small>{email}</small>
          </FontAwesomeIcon>

          <div className="nav-item dropdown">
            <div className="dropdown-menu">
              <a className="dropdown-item" onClick={handleLogout}>
                <small>Cerrar Sesion</small>
              </a>
              
            </div>
          </div>

        </div>
      </a>
    </div>
  );
};

export default InfoUser;
