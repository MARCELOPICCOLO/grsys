import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalExample = ({ listaProdutos, order }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <button className="btn btn-primary mb-4" onClick={handleShow}>
        +
      </button>
      <div
        class="mb-2 d-flex flex-row justify-content-between flex-1"
        style={{ backgroundColor: "red" }}
      >
        <h6>Comanda Nº: {order.id}</h6>
        <h6>Mesa Nº: {order.table_num}</h6>
      </div>
      {show && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Lançar Produtos</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {Array.isArray(listaProdutos) && listaProdutos.length > 0 ? (
                  <div class="d-flex flex-row">
                    <form>
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">
                          Produtos cadastrados
                        </label>
                        <select
                          class="form-control"
                          id="exampleFormControlSelect1"
                        >
                          {listaProdutos.map((item, index) => (
                            <option key={index}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                    </form>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Quantidade</label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Input padrão"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => alert("Ação confirmada!")}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalExample;
