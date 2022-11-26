import "./App.css";
import ChatBot from "react-simple-chatbot";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBot
          headerTitle="Vitabot"
          steps={[
            {
              id: "1",
              message: "Olá",
              trigger: "2",
            },
            {
              id: "2",
              message:
                "Antes de começarmos preciso que você nos conceda sua localização para o navegador :)",
              trigger: "3",
            },
            {
              id: "3",
              options: [{ value: 1, label: "Entendi.", trigger: "4" }],
            },
            {
              id: "4",
              message: "Deseja se identificar?",
              trigger: "5",
            },
            {
              id: "5",
              options: [
                { value: 1, label: "Não!", trigger: "6" },
                { value: 2, label: "Sim...", trigger: "7" },
              ],
            },
            {
              id: "6",
              message: "Fim!",
              end: true,
            },
            {
              id: "7",
              message: "Bora que vamo!",
              end: true,
            },
          ]}
        />
        <div className="Versao-div">v 0.1</div>
      </header>
    </div>
  );
}

export default App;
