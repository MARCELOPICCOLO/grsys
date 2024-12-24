import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);

  function Login() {
    if (login == "admin" && senha == "123") {
      console.log("entrou");
      navigate("/dashboard");
    }
  }

  const handleInputChange = (event) => {
    setLogin(event.target.value); // Atualiza o estado com o valor do input
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value); // Atualiza o estado com o valor do input
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div style={{ padding: "20px" }}>
        <div>GRSYN</div>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control mb-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={login}
            onChange={handleInputChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={senha}
            onChange={handleSenhaChange}
          />
        </div>
        <button
          type="button"
          class="btn btn-primary mt-3"
          onClick={() => Login()}
        >
          Primary
        </button>
      </div>
    </div>
  );
}
