import "./App.css";
import ChatBot from "react-simple-chatbot";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBot
          headerTitle="VITA=KOD"
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
              user: true,
              trigger: "4",
            },
            {
              id: "4",
              message: "Hi {previousValue}, nice to meet you!",
              end: true,
            },
          ]}
        />
      </header>
    </div>
  );
}

export default App;
