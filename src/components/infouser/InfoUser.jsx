import "./infouser.css";
import useAuth from "../../hook/useAuth";
import useInfoUser from "../../hook/useInfoUser";
import { useNavigate } from "react-router-dom";
import { URL_LOGIN } from "../../constants/Contants";


const InfoUser = () => {
  const { handleLogout } = useAuth();
  const { email, avatar, userName } = useInfoUser();
  const navigate = useNavigate();
  const handleFormLogin = () => {
    navigate(URL_LOGIN);
  };
  console.log("Usuario")
  console.log(userName)

  return (
    <>
      <div className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="dropdown01"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div className="chip">
            {avatar && avatar !== ""?<img
              src={avatar}
              alt="Avatar"
              className="avatar"
            />:<img
              src="./user.svg"
              alt="Avatar"
              className="avatar"
            />}
            
            {userName ? userName : <p>Iniciar Sesion</p>}
          </div>
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdown01">
          {email && email !== "" ? (
            <a className="dropdown-item" onClick={handleLogout}>
              Cerrar Sesion
            </a>
          ) : (
            <a
              className="dropdown-item"
              onClick={() => {
                handleFormLogin;
              }}
            >
              Iniciar Sesion
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoUser;
