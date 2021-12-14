import { createServer, Model } from "miragejs";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de webapp",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2021-11-09 09:00:00"),
        },
        {
          id: 2,
          title: "Compra de mouse pad",
          type: "withdrow",
          category: "Compras",
          amount: 80,
          createdAt: new Date("2021-11-19 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      schema.create("transaction", data);
      return data;
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
