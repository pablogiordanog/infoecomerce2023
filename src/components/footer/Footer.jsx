import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container abs-center small">
        <section className="footer-top padding-top">
          <div className="row">
            
            <aside className="col-sm-3 col-md-3 white">
              <h5>E-commerce</h5>
              <p><strong>Articulos</strong> para comercialización via Internet</p> 
            </aside>

            <aside className="col-sm-3 col-md-3 white">
              <h5 className="title">Contactos</h5>
              <article className="white">
                <p><strong>Celular</strong>:+59 3644613998</p>
                <p><strong>E-mail</strong>:pablogiordanog@gmail.com</p>
              </article>
            </aside>

            <aside className="col-sm-3 col-md-3 white">
              <article className="white">
                Copyryght © Pablo Giordnao 2023. Todos los derechos reservados
              </article>
            </aside>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
