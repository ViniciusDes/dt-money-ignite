import { createServer } from "miragejs";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Venda do carro",
          amount: 25000,
          type: "Venda",
          category: "carro",
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
