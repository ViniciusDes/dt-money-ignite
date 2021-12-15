import { ReactNode } from "react";

export interface Transaction {
  id: number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
}

export interface ITransactionResponse {
  transactions: Array<Transaction> | null;
}

export interface TransactionsProviderProps {
  children: ReactNode;
}

export type TransactionInput = Omit<Transaction, "id" | "createdAt">;

export interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}
