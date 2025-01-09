export default function TableItens({ order }) {
  const header = ["ID", "PRODUTO", "PREÇO UNI.", "QUANT"];
  return (
    <table class="table text-secondary">
      <thead>
        <tr>
          {header.map((item) => (
            <th scope="col" class="text-secondary">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {order.products &&
          order.products.map((prod, index) => (
            <tr key={prod.id}>
              <th scope="row" class="text-secondary">
                {prod.id}
              </th>
              <td class="text-secondary">{prod.name}</td>
              <td class="text-secondary">{prod.price.toFixed(2)}</td>
              <td class="text-secondary">{prod.quantidade}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
