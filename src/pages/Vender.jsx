import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VenderComponent from "../componentes/VenderComponent";
import Modal from "../componentes/ModalComponent";

export default function Vender({ lista, setComanda, listaProdutos }) {
  return (
    <div class="d-flex flex-column p-2">
      <h1 class="text-primary">GERENCIAR COMANDAS</h1>
      <div class="d-flex flex-row justify-content-end">
        <button class="btn btn-primary sm-btm mb-2">NOVA</button>
      </div>
      <div class="d-flex flex-column">
        {lista.orders.map((item, index) => (
          <VenderComponent
            order={item}
            key={index}
            listaProdutos={listaProdutos}
          />
        ))}
      </div>
    </div>
  );
}
