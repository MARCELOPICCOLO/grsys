import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalExample = ({ listaProdutos, order, setComanda }) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [product, setProduct] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (event) => {
    setAmount(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const product_ = listaProdutos.find((i) => i.id == selectedValue);
    setProduct(product_);
    console.log("ID Selecionado:", product_);
  };

  const saveProduct = () => {
    let search = order.products.find((item) => item.id == product.id);
    if (!search) {
      order.products.push(product);
    } else {
    }
    console.log(">>>", order);
  };

  return (
    <div>
      <button className="btn btn-primary mb-4" onClick={handleShow}>
        +
      </button>
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
                  <div>
                    <div class="d-flex flex-row justify-content-between">
                      <h5>Comanda: {order.id}</h5>
                      <h5>Mesa: {order.table_num}</h5>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center">
                      <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">
                            Produtos cadastrados
                          </label>
                          <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            onChange={handleSelectChange}
                          >
                            {listaProdutos.map((item, index) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </form>
                      <div class="form-group">
                        <label for="exampleFormControlSelect1">
                          Quantidade
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="Input padrão"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div class="d-flex align-self-end justify-content-center">
                        {product ? (
                          <p class="text-center mt-4">
                            R$ {amount * product.price_out}
                          </p>
                        ) : (
                          <p class="text-center mt-4">R$ {amount * 1}</p>
                        )}
                      </div>
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
                  onClick={saveProduct}
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
