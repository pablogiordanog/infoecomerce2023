import { Navigate, useLocation } from "react-router-dom";
import { URL_LOGIN } from "../constants/Contants";
import useInfoUser from "../hook/useInfoUser";

const ProtectedRouter = ({children}) =>{
  const {email} = useInfoUser();
  const currentLocation = useLocation()
  if(!email){
    console.log("se ejecuto")
    return <Navigate to={URL_LOGIN} state={{from:currentLocation}} replace={true}/>
  }

  return children;
}

export default ProtectedRouter;