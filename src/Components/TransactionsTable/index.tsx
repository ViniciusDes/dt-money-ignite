import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { api } from "../../services/api";
import { Container } from "./styles";

interface ITransaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

interface ITransactionResponse {
  transactions: Array<ITransaction> | null;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res: AxiosResponse<ITransactionResponse | any> = await api.get(
      "/transactions"
    );
    const { transactions } = res.data;
    console.log(transactions);
    setTransactions(transactions);
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>R$ {transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
