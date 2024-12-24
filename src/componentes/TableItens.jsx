export default function TableItens({ order }) {
  return (
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">PRODUTO</th>
          <th scope="col">PREÇO</th>
          <th scope="col">QUANT</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((prod, index) => (
          <tr key={prod.prod_id}>
            <th scope="row">{prod.id}</th>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>{prod.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
