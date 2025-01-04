import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalExample = ({ listaProdutos, order, setComandas, comandas }) => {
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [product, setProduct] = useState(listaProdutos[0]);
  const [msg, setMsg] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInputChange = (event) => {
    setAmount(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleSelectChange = (event) => {
    setProduct(null);
    const selectedValue = event.target.value;
    const product_ = listaProdutos.find((i) => i.id == selectedValue);
    setProduct(product_);
  };

  const baseObj = async (product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price_out,
      quantidade: Number(amount || 1),
    };
  };

  const apiSaveProduct = async () => {
    try {
      const response = fetch("http://127.0.0.1:8000/api/order-product", {
        method: "POST", // Método da requisição
        headers: {
          "Content-Type": "application/json", // Especifica o tipo do corpo da requisição
        },
        body: JSON.stringify({
          order: order.id,
          product: product.id,
          amount: Number(amount),
        }), // Transforma os dados em uma string JSON
      });

      setMsg("Produto adicionado com sucesso");

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const asyncSaveProduct = async () => {
    const currentProduct = product || listaProdutos[0]; // Use diretamente o primeiro elemento se "product" for null

    let index = null;
    let obj = await baseObj(currentProduct);

    index = order.products.findIndex((item) => item.id == currentProduct.id);
    apiSaveProduct(currentProduct);

    if (index === -1) {
      order.products.push(obj);
      let indexO = comandas.orders.findIndex((item) => item.id == order.id);
    } else {
      order.products[index].quantidade += Number(amount);
    }
    let indexO = comandas.orders.findIndex((item) => item.id == order.id);

    if (indexO !== -1) {
      let copy = { ...comandas }; // Cria uma nova cópia do objeto
      copy.orders = [...comandas.orders]; // Cria uma nova cópia do array de pedidos
      copy.orders[indexO] = order; // Atualiza o pedido específico
      setComandas(copy); // Define o novo estado
    }
  };

  useEffect(() => {
    // Verifica e atualiza o produto quando o componente é carregado
    if (!product && listaProdutos.length > 0) {
      setProduct(listaProdutos[0]);
    }
  }, [listaProdutos]);

  useEffect(() => {
    // Mostrar o alerta após 3 segundos
    if (msg) {
      const timer = setTimeout(() => {
        setMsg(null);
      }, 3000);

      // Limpar o timer caso o componente seja desmontado
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div>
      <button class="btn btn-primary mb-4" onClick={handleShow}>
        +
      </button>
      {show && (
        <div class="modal fade show d-block" tabIndex={-1} role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <div
                  class="d-flex flex-row justify-content-between"
                  style={{ width: "100%" }}
                >
                  <h5 class="modal-title">Lançar Produtos</h5>
                  <button
                    type="button"
                    class="close"
                    onClick={handleClose}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
              <div class="modal-body">
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
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={handleClose}
                >
                  Fechar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={asyncSaveProduct}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
          {msg ? (
            <div
              class="alert alert-success"
              role="alert"
              style={{
                width: "40%",
                position: "fixed",
                top: "10px", // 10px de distância do topo
                right: "10px", // 10px de distância da borda direita
              }}
            >
              {msg}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ModalExample;
