import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TransactionsTable() {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res: AxiosResponse = await api.get("/transactions");
    console.log(res.data);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento app</td>
            <td className="deposit">R$13.200</td>
            <td>Trabalho</td>
            <td>12/11/2009</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdrow">- R$1.200</td>
            <td>Moradia</td>
            <td>19/11/2009</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
