import { useEffect, useState } from "react";
import TableItens from "./TableItens";
import ModalComponent from "./ModalComponent";

export default function Table({ order, listaProdutos, setComandas, comandas }) {
  const [localOrder, setLocalOrder] = useState(order); // Estado local para atualizar a tabela]

  function getPriceOrder() {
    const valor = order.products.reduce(
      (acc, item) => (acc += item.price * item.quantidade),
      0
    );

    return parseFloat(valor.toFixed(2));
  }
  const [price, setPrice] = useState(getPriceOrder());

  useEffect(() => {
    if (comandas) {
      //Encontra a ordem atualizada em "comandas.orders"
      const updatedOrder = comandas.orders.find((i) => i.id == order.id);

      // Atualiza o estado local apenas se a ordem for encontrada
      if (updatedOrder) {
        setLocalOrder({ ...updatedOrder }); // Garante que é um novo objeto
        setPrice(getPriceOrder());
      }
    }
  }, [comandas]); // Monitora alterações em "comandas"

  return (
    <div class="mb-2">
      <div class="card p-2">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div>
              <ModalComponent
                listaProdutos={listaProdutos}
                order={order}
                setComandas={setComandas}
                comandas={comandas}
              />
            </div>
            <p class="font-weight-bold"> R$ {price.toFixed(2)}</p>
          </div>
          <div class="bg-info text-white d-flex flex-row justify-content-between px-2 align-items-center">
            <h5>Nº : {localOrder.id}</h5>
            <h5>Mesa: {localOrder.table_num}</h5>
          </div>
          <div>
            {/* Passa a ordem atualizada para "TableItens" */}
            <TableItens order={localOrder} />
          </div>
        </div>
      </div>
    </div>
  );
}
