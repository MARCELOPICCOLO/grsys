import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VenderComponent from "../componentes/VenderComponent";
import Modal from "../componentes/ModalComponent";
import { useEffect, useState } from "react";
import ModalOrderComponent from "../componentes/ModalOrderComponente";

export default function Vender({ lista, setComandas, listaProdutos }) {
  const [showModalOrder, setShowModalOrder] = useState(false);

  const handleShow = () => setShowModalOrder(true);
  const handleClose = () => setShowModalOrder(false);

  useEffect(() => {}, [lista]);

  return (
    <div class="d-flex flex-column px-4 flex-grow-1">
      <h1 class="text-primary text-center">GERENCIAR COMANDAS</h1>
      <div class="d-flex flex-row justify-content-end">
        <button class="btn btn-primary sm-btm mb-2" onClick={handleShow}>
          ABRIR CONTA
        </button>
      </div>
      {showModalOrder && (
        <ModalOrderComponent
          handleClose={handleClose}
          comandas={lista}
          setComandas={setComandas}
        />
      )}
      <div class="d-flex flex-column">
        {lista.orders.map((item, index) => (
          <VenderComponent
            order={item}
            key={index}
            listaProdutos={listaProdutos}
            setComandas={setComandas}
            comandas={lista}
          />
        ))}
      </div>
    </div>
  );
}
