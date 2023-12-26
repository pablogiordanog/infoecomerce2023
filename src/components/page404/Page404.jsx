import "./page404.css"

const Page404 = () => {
  return (
    <div>
      <div className="container404">
        <h1 className="h1404">Oops, parece que te has perdido</h1>
        <p>La página que estás buscando no existe.</p>
        <p>
          ¿Qué tal si vuelves a{" "}
          <a className="a404" href="/ecommerce2023/">
            la página de inicio
          </a>
          ?
        </p>
      </div>
    </div>
  );
};

export default Page404;
