import useInfoUser from "../../hook/useInfoUser";

const ListItems = () => {
  
  const {email} = useInfoUser();
  const data = localStorage.getItem(email);

  return (
    <>
      <div className="d-flex justify-content-center row">
        {data.map((item) => (
            <div className="col-md-10">
              <div className="row p-2 bg-white border rounded">
                <div className="col-md-3 mt-1">
                  <img
                    className="img-fluid img-responsive rounded product-image"
                    src={item.imagen}
                  />
                </div>
                <div className="col-md-6 mt-1">
                  <h5>{item.title}</h5>
                  <div className="d-flex flex-row">
                    <button
                      onClick={() => {
                        handleActualizar();
                      }}
                      className="btn btn-sm btn-outline-secondary mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                  <div className="d-flex flex-row align-items-center">
                    <input
                      type="number"
                      className="form-control"
                      value={item.price}
                      onChange={(e) => {}}
                    />
                  </div>
                  <h6 className="text-success">{item.category}</h6>
                </div>
              </div>
            </div>
        ))}    
      </div>
    </>
  );
};

export default ListItems;
