import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../Hooks/useTransactions";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onCloseRequest: () => void;
}

export function NewTransactionModal({
  isOpen,
  onCloseRequest,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [type, setType] = useState("deposit");

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  async function handleCreateNewTransaction(ev: FormEvent) {
    ev.preventDefault();

    await createTransaction({
      title,
      type,
      category,
      amount: value,
    });

    setTitle("");
    setValue(0);
    setCategory("");
    setCategory("deposit");
    onCloseRequest();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseRequest}
      className="react-modal-content"
      overlayClassName="react-modal-overlay"
    >
      <button
        type="button"
        onClick={onCloseRequest}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(ev) => setValue(Number(ev.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
