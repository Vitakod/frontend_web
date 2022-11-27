import "./App.css";
import VitaClub from "./vitaClub";
import ChatBot from "react-simple-chatbot";
import AnimatedMulti from "./components/AnimateMult";
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
    // isGeolocationAvailable,
    // isGeolocationEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false);
  const [usuarioLocalizacao, setUsuarioLocalizacao] = useState();
  // const [sintomas, setSintomas] = useState([]);

  const [tela, setTela] = useState('chat')

  const verificarLocalizacao = () => {
    if (coords) {
      setLocalizacaoAtiva(true);
      setUsuarioLocalizacao({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
      console.log(coords);
    } else {
      alert(
        "Por favor click no canto superior esquerdo para conceder acesso a localização"
      );
    }
  };

  const handleSintomas = (sintomas) => {
    const sintomasValue = sintomas.map((v) => {
      return v.value;
    });
    console.log(sintomasValue);
    console.log(usuarioLocalizacao);
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

        <button className="Mais"
          style={{ display: !localizacaoAtiva || tela != 'chat' ? 'none' : '' }}
          onClick={() => setTela('VitaClub')}
        >...</button>

        <ChatBot
          handleEnd={handleEnd}
          style={{ display: !localizacaoAtiva ? "none" : "" }}
          headerTitle="Vitabot"
          // speechSynthesis={{ enable: true, lang: "pt-BR" }}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#3e3" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Escreva sua resposta..."}
          steps={[
            //#region IDENTIFICAÇÃO
            {
              id: "4",
              message: "Deseja se identificar?",
              trigger: "5",
              placeholder: "Escolha uma opção",
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
              placeholder: "Escolha uma opção",
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
              component: (
                <AnimatedMulti
                  onChange={(valores) => handleSintomas(valores)}
                />
              ),
              placeholder: "Marque as opções",
              trigger: "17",
            },
            {
              id: "17",
              message: "Finalizou?",
              trigger: "18",
              delay: 5000,
            },
            {
              id: "18",
              options: [{ value: 1, label: "Sim!", trigger: "19" }],
            },
            {
              id: "19",
              message: "Obrigado por reportar!",
              trigger: "20",
            },
            {
              id: "20",
              message: "Fim",
              end: true,
            },
          ]}
        />
        {
          tela != 'chat' ?
            <div>
              <VitaClub />
              <button className="Voltar" onClick={() => setTela('chat')}>⏪</button>
            </div>
            :
            <div></div>
        }

        <div className="Versao-div">v 1.0.0</div>
      </header>
    </div>
  );
}

export default App;
