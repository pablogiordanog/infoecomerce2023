import "./login.css";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { URL_ALL_USERS, URL_LOGIN_WEB } from "../../constants/Contants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { handleLogin } = useAuth();
  const [name, setName] = useState("");
  const [pws, setPws] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  //Query para listar todos los Usuarios
  const getUsuarios = async () => {
    const res = await fetch(URL_ALL_USERS);
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  };
  const query = useQuery({
    queryKey: ["usersList"],
    queryFn: getUsuarios,
  });

  //Mutation para login
  const loginMutation = async ({ email, password }) => {
    const response = await fetch(URL_LOGIN_WEB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };

  /*const handleLogIn = (e) => {
    e.preventDefault();
    const mutation = useMutation({
      mutationFn:loginMutation,
      onSuccess:(data)=>{
        console.log('Operacion Exitosa',data);

        handleLogin(name, pws);
        navigate(from, { replace: true });
      },
      onError:(data)=>{
        console.log('Algo salio mal',data);
      },
    }); 
  };
  */
  //Mutation para login
  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      console.log("Operacion Exitosa");
      console.log(query.data);
      let rol = "customer";
      let avatar = "";
      let userName = "";
      const infoUser = query.data.find((element) => element.email == name);
      console.log(infoUser);
      if(infoUser!=="undefined"){
        rol = infoUser.role;
        avatar = infoUser.avatar;
        userName = infoUser.name;
      }
      handleLogin(name, pws, rol, avatar, userName);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      navigate(from, { replace: true });
    },
    onError: () => {
      //console.log('Algo salio mal',data);
      alert("Usuario y/o Contraseña Incorrecta.");
    },
  });

  return (
    <>
      <div className="container">
        <div className="card card-container">
          <p id="profile-name" className="profile-name-card">
            <FontAwesomeIcon
              icon={faUser}
              style={{ width: "40px", height: "40" }}
            />
          </p>
          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"></span>

            <input
              type="email"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required
            />

            <input
              type="password"
              value={pws}
              onChange={(e) => {
                setPws(e.target.value);
              }}
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />

            <div id="remember" className="checkbox">
              <label>
                <a>
                  <input type="checkbox" value="remember-me" /> Recordar
                  Contraseña?
                </a>
              </label>
            </div>
            <button
              onClick={(event) => {
                event.preventDefault();
                mutation.mutate({ email: name, password: pws });
              }}
              className="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Iniciar sesión <FontAwesomeIcon icon={faSignInAlt} />
            </button>
          </form>
          <a href="#" className="forgot-password">
            ¿Olvidaste la contraseña?
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
