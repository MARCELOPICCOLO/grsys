import { useState } from "react";

export default function ModalOrderComponent({
  handleClose,
  comandas,
  setComandas,
}) {
  const [table, setTable] = useState(null);
  const [msg, setMsg] = useState(null);

  const handleInputChange = (event) => {
    const num = event.target.value;
    if (
      comandas.orders.findIndex(
        (item) => item.table_num == num && item.status == 2
      ) == -1
    ) {
      setMsg(null);
      console.log(num);
      setTable(num); // Atualiza o estado com o valor do input
    } else {
      setMsg("Esta mesa já está em uso.");
      console.log("comanda em uso");
    }
  };

  const openOrder = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/order", {
        method: "POST", // Método da requisição
        headers: {
          "Content-Type": "application/json", // Especifica o tipo do corpo da requisição
        },
        body: JSON.stringify({
          table_num: Number(table),
        }), // Transforma os dados em uma string JSON
      });
      const data = await response.json();
      let copy = { ...comandas };
      copy.orders.push(data.order);

      console.log("copy", copy);
      setComandas(copy);
    } catch (e) {}
  };

  return (
    <div class="modal fade show d-block" tabIndex={-1} role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div
              class="d-flex flex-row justify-content-between"
              style={{ width: "100%" }}
            >
              <h5 class="modal-title">ABRIR CONTA</h5>
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
            <div class="form-group">
              <label for="exampleFormControlSelect1">Mesa Nº</label>
              <input
                class="form-control"
                type="number"
                placeholder="Input padrão"
                onChange={handleInputChange}
              />
              {msg && <span class="text-danger">{msg}</span>}
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleClose}
            >
              Fechar
            </button>
            <button type="button" class="btn btn-primary" onClick={openOrder}>
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
