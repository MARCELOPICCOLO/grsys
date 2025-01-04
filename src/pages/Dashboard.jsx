import { useEffect, useState } from "react";
import Vender from "./Vender";
import Comprar from "./Comprar";

export default function Dashboard() {
  const lista = [
    { id: 1, name: "Vender" },
    { id: 2, name: "Comprar" },
    { id: 3, name: "Relatórios" },
    { id: 4, name: "Caixa" },
  ];

  const [comandas, setComandas] = useState(null);
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [page, setPage] = useState(0);
  function teste(index) {
    setPage(index);
  }

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <Vender
            lista={comandas}
            setComandas={setComandas}
            listaProdutos={todosProdutos}
            agrupar={agrupar}
          />
        );
      case 1:
        return <Comprar />;
      case 2:
    }
  };
  function agrupar(dados) {
    const agrupados = dados.reduce((acc, produto) => {
      if (!acc[produto.pro_id]) {
        acc[produto.pro_id] = {
          id: produto.pro_id,
          name: produto.name,
          price: produto.price,
          quantidade: 0,
        };
      }

      // Incrementa a quantidade
      acc[produto.pro_id].quantidade += produto.quantidade || 1;

      return acc;
    }, {});

    // Retorna os valores como um array
    return Object.values(agrupados);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (comandas == null) {
          const response = await fetch("http://127.0.0.1:8000/api/order");
          const data = await response.json();
          console.log(data);

          if (Array.isArray(data.orders)) {
            data.orders = data.orders.map((o) => ({
              ...o,
              products: agrupar(Object.values(o.products)), // Converte e agrupa os produtos
            }));
          }
          setComandas(data);
        }
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    if (!comandas) {
      fetchData();
    }
  }, [comandas]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/product");
        const data = await response.json();
        setTodosProdutos(data.products);
      } catch (e) {
        console.error("Erro ao buscar dados:", e);
      }
    };

    if (todosProdutos.length == 0) {
      fetchData();
    }
  }, [todosProdutos]);
  return (
    <>
      <div class="container-fluid d-flex flex-direction-row vh-100">
        <div style={{ backgroundColor: "blue" }} class="p-2">
          <div class="d-flex flex-column">
            <ul class="mt-4">
              {lista.map((item, index) => (
                <p key={index} onClick={() => teste(index)}>
                  {item.name}
                </p>
              ))}
            </ul>
          </div>
        </div>
        <div class="d-flex" style={{ width: "55%" }}>
          {comandas ? renderPage() : null}
        </div>
      </div>
    </>
  );
}
