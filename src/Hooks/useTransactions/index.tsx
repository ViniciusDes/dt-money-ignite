import { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  ITransactionResponse,
  Transaction,
  TransactionContextData,
  TransactionInput,
  TransactionsProviderProps,
} from "./interfaces";

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res: AxiosResponse<ITransactionResponse | any> = await api.get(
      "/transactions"
    );
    const { transactions } = res.data;
    setTransactions(transactions);
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const res = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const transaction = res.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
