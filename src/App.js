import "./App.css";
import ChatBot from "react-simple-chatbot";

function App() {
  const handleEnd = ({ steps, values }) => {
    // console.log(steps);
    // console.log(values);
    const valuesString = values.map((v) => {
      return v;
    });
    alert(`Chat handleEnd callback! Number: ${valuesString}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ChatBot
          handleEnd={handleEnd}
          headerTitle="Vitabot"
          speechSynthesis={{ enable: true, lang: "pt-BR" }}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#3e3" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Escolha a opção..."}
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

            //#region IDENTIFICAÇÃO
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
              message: "Digite seu nome:",
              trigger: "8",
            },
            {
              id: "8",
              user: true,
              trigger: "9",
            },
            {
              id: "9",
              message: "Digite seu email:",
              trigger: "10",
            },
            {
              id: "10",
              user: true,
              trigger: "11",
            },
            {
              id: "11",
              message: "Digite seu CPF:",
              trigger: "12",
            },
            {
              id: "12",
              user: true,
              trigger: "13",
            },
            {
              id: "13",
              message: "Selecione sua faixa etária:",
              trigger: "14",
            },
            {
              id: "14",
              options: [
                { value: 1, label: "0 - 17 anos", trigger: "15" },
                { value: 2, label: "18 - 60 anos", trigger: "15" },
                { value: 3, label: "Mais de 60 anos", trigger: "15" },
              ],
            },
            //#endregion

            {
              id: "15",
              message: "Acabou!",
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
