import { useState } from "react";
import TableItens from "./TableItens";
import ModalComponent from "./ModalComponent";

export default function Table({ order, listaProdutos, setComanda }) {
  return (
    <div class="mb-2">
      <div class="card p-2">
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div>
              <ModalComponent
                listaProdutos={listaProdutos}
                order={order}
                setComanda={setComanda}
              />
            </div>
            <p class="font-weight-bold">
              {/* R$ {order.products.reduce((acc, item) => acc + item.price, 0)} */}
            </p>
          </div>
          <div class="bg-info text-white d-flex flex-row justify-content-between px-2 align-items-center">
            <h5>Nº : {order.id}</h5>
            <h5>Mesa: {order.table_num}</h5>
          </div>
          <div>
            <TableItens order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
