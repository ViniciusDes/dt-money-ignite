import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/Header";
import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <div className="App">
      <Header />

      <Dashboard />
      <GlobalStyle />
    </div>
  );
}

export default App;
