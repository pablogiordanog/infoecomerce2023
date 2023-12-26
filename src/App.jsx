import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import About from "./components/about/About.jsx";
import IndexCategory from "./components/category/IndexCategory.jsx";
import ACategory from "./components/category/ACategory.jsx";
import IndexProducts from "./components/products/IndexProducts.jsx";
import Search from "./components/search/Search.jsx";
import Page404 from "./components/page404/Page404.jsx";
import Login from "./components/login/Login.jsx";

import AuthContext from "./context/AuthContext.jsx";
import ProtectedRouter from "./components/ProtectedRouter.jsx";
import {
  URL_ABOUT,
  URL_CARD,
  URL_CATEGORY,
  URL_HOME,
  URL_LOGIN,
  URL_PRODUCTS,
  URL_SEARCH,
  URL_USER,
} from "./constants/Contants.jsx";
import InfoUser from "./components/infouser/InfoUser.jsx";
import Card from "./components/card/Card.jsx";
import AProduct from "./components/products/AProduct.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useInfoUser from "./hook/useInfoUser.jsx";

function App() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (email, password, rol, avatar, userName) => {
    setUser({ email, password});
    localStorage.setItem("user", JSON.stringify({ email, password, rol, avatar , userName}));
  };

  const handleLogout = () => {
    console.log("funcion logout")
    setUser({ email: "", password: ""});
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  const queryClient = new QueryClient();
  
  useEffect(() => {
    const storageUser = useInfoUser();
    if (storageUser) {
      const {email, password, rol, avatar, userName} = storageUser;
      handleLogin(email,password, rol, avatar, userName);
    }
  }, []);
   
  const value = { user, handleLogin, handleLogout};

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path={URL_HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path={URL_CATEGORY}
              element={
                <ProtectedRouter>
                  <IndexCategory />
                </ProtectedRouter>
              }
            />
            <Route
              path={URL_CATEGORY + "/:id"}
              element={
                <ProtectedRouter>
                  <ACategory />
                </ProtectedRouter>
              }
            />
            <Route
              path={URL_PRODUCTS}
              element={
                <ProtectedRouter>
                  <IndexProducts />
                </ProtectedRouter>
              }
            />
            <Route
              path={URL_PRODUCTS + "/:id"}
              element={
                <ProtectedRouter>
                  <AProduct />
                </ProtectedRouter>
              }
            />
            <Route path={URL_ABOUT} element={<About />} />
            <Route path={URL_SEARCH} element={<Search />} />
            <Route path={URL_CARD} element={<Card />} />
            <Route path={URL_LOGIN} element={<Login />} />
            <Route path={URL_USER} element={<InfoUser />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
