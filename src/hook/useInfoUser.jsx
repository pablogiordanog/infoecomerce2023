/*Metodo que consulta si esta en el localstorage la informacion de usuario*/
const useInfoUser = () => {
    const storageUser = localStorage.getItem("user");
    let emailTmp = null;
    let pwsTmp = null;
    let rolTmp = "customer";
    let avatarTmp = "";
    let userNameTmp = "";
    if (storageUser){
        const userData = JSON.parse(storageUser);
        const {email, password, rol, avatar, userName} = userData;
        emailTmp = email;
        pwsTmp = password;
        rolTmp = rol;
        avatarTmp = avatar;
        userNameTmp = userName
    }
    return {"email":emailTmp,"password":pwsTmp, "rol":rolTmp, "avatar":avatarTmp, "userName":userNameTmp};
}

export default useInfoUser;