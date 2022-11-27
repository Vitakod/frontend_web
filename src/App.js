import "./App.css";
import ChatBot from "react-simple-chatbot";

import { useGeolocated } from "react-geolocated";
import { useState } from "react";

function App() {
  const handleEnd = ({ steps, values }) => {
    // console.log(steps);
    // console.log(values);
    const valuesString = values.map((v) => {
      return v;
    });
    alert(`Chat handleEnd callback! Number: ${valuesString}`);
  };

  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false);
  const [usuarioLocalizacao, setUsuarioLocalizacao] = useState();

  const verificarLocalizacao = () => {
    if (coords) {
      setLocalizacaoAtiva(true);
      setUsuarioLocalizacao({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    } else {
      alert(
        "Por favor click no canto superior esquerdo para conceder acesso a localização"
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <ChatBot
          style={{ display: localizacaoAtiva ? "none" : "" }}
          headerTitle="Verificando Localização"
          handleEnd={verificarLocalizacao}
          botDelay={2000}
          steps={[
            {
              id: "1",
              message:
                "Antes de começarmos preciso que você nos conceda sua localização para o navegador :)",
              trigger: "2",
            },
            {
              id: "2",
              options: [{ label: "Entendi" }],
              end: true,
            },
          ]}
        />

        <ChatBot
          handleEnd={handleEnd}
          style={{ display: !localizacaoAtiva ? "none" : "" }}
          headerTitle="Vitabot"
          speechSynthesis={{ enable: true, lang: "pt-BR" }}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#3e3" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Escolha a opção..."}
          steps={[
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
              message: "Ok, Vamos lá!",
              trigger: "15",
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
              message: "Conte-me como você está se sentindo",
              trigger: "16",
            },
            {
              id: "16",
              options: [
                { value: 1, label: "Tosse", trigger: "17" },
                { value: 2, label: "Febre", trigger: "17" },
                { value: 3, label: "Cansaço", trigger: "17" },
                { value: 4, label: "Perda de paladar/olfato", trigger: "17" },
                { value: 5, label: "Falta de ar", trigger: "17" },
                { value: 6, label: "Diarréia", trigger: "17" },
                { value: 7, label: "Dor de cabeça", trigger: "17" },
              ],
              placeholder: "Marque as opções",
            },
            {
              id: "17",
              message: "Obrigado por reportar!",
              trigger: "18",
            },
            {
              id: "18",
              message: "Fim",
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
