import "./App.css";
import VitaClub from "./components/vitaClub";
import ChatBot from "react-simple-chatbot";
import AnimatedMulti from "./components/AnimateMult";
import { useGeolocated } from "react-geolocated";
import { useState } from "react";
import axios from "axios";

function App() {
  const handleEnd = ({ steps, values }) => {
    // console.log(steps);
    // console.log(values);
    const valuesString = values.map((v) => {
      return v;
    });
    console.log(usuarioLocalizacao);

    alert(`Valores: ${valuesString}`);
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

  const [tela, setTela] = useState('chat')

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

  const handleSintomas = (sintomas) => {
    const sintomasValue = sintomas.map((v) => {
      return v.value;
    });
    console.log(sintomasValue);
  };

  const handleSave = async () => {
    console.log("responsee");

    const BASE_URL = "https://veiculos.fipe.org.br/api/veiculos";

    // const BASE_URL =
    //   "https://id3ns36xmi.execute-api.us-east-2.amazonaws.com/api";

    const api = axios.create({
      baseURL: BASE_URL,
    });

    // api.get("/geo", { lat: "-20.4764898", lng: "-54.61846" }).then((r) => {
    //   console.log("lat lng");
    //   console.log(r);
    // });

    api.post("/ConsultarTabelaDeReferencia").then((r) => {
      console.log(r);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleSave}>teste</button>
        <ChatBot
          style={{ display: localizacaoAtiva ? "none" : "" }}
          headerTitle="Verificando Localização"
          handleEnd={verificarLocalizacao}
          placeholder={"Aceite a localização."}
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
          style={{ display: !localizacaoAtiva || tela != 'chat' ? 'none' : '' }}
          headerTitle="Vitabot"
          // speechSynthesis={{ enable: true, lang: "pt-BR" }}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#38f" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Escreva sua resposta..."}
          steps={[
            //#region IDENTIFICAÇÃO
            {
              id: "1",
              message: "Deseja se identificar?",
              placeholder: "Escolha uma opção",
              trigger: "2",
            },
            {
              id: "2",
              options: [
                { value: 1, label: "Não!", trigger: "6" },
                { value: 2, label: "Sim...", trigger: "3" },
              ],
              placeholder: "Escolha uma opção",
            },
            {
              id: "3",
              message: "Fazer login ou novo cadastro?",
              trigger: "4",
            },
            {
              id: "4",
              options: [
                { value: 1, label: "Login", trigger: "30" },
                { value: 2, label: "Novo cadastro", trigger: "7" },
              ],
              placeholder: "Escolha uma opção",
            },
            {
              id: "6",
              message:
                "Se você não se identificar, não poderá participar do nosso clube de benefícios...",
              trigger: "13",
            },
            {
              id: "7",
              message: "Digite seu email:",
              trigger: "8",
            },
            {
              id: "8",
              user: true,
              trigger: "9",
            },
            {
              id: "9",
              message: "Digite sua senha:",
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
                { value: 1, label: "Até 17 anos", trigger: "15" },
                { value: 2, label: "18 - 60 anos", trigger: "15" },
                { value: 3, label: "Mais de 60 anos", trigger: "15" },
              ],
              placeholder: "Escolha uma opção",
            },
            {
              id: "15",
              message: "Qual é o seu sexo?",
              trigger: "16",
            },
            {
              id: "16",
              options: [
                { value: 0, label: "Feminino", trigger: "49" },
                { value: 1, label: "Masculino", trigger: "49" },
              ],
              placeholder: "Escolha uma opção",
            },
            //#endregion

            //#region Login
            {
              id: "30",
              message: "Email:",
              trigger: "31",
            },
            {
              id: "31",
              user: true,
              trigger: "32",
            },

            {
              id: "32",
              message: "Senha:",
              trigger: "33",
            },
            {
              id: "33",
              user: true,
              trigger: "50",
            },
            //#endregion

            {
              id: "49",
              message: "Ok, Vamos lá!",
              trigger: "50",
            },
            {
              id: "50",
              message: "Conte-me como você está se sentindo",
              trigger: "51",
            },
            {
              id: "51",
              component: (
                <AnimatedMulti
                  onChange={(valores) => handleSintomas(valores)}
                />
              ),
              placeholder: "Marque as opções",
              trigger: "52",
            },
            {
              id: "52",
              message: "Finalizou?",
              delay: 5000,
              trigger: "53",
            },
            {
              id: "53",
              options: [{ value: 1, label: "Sim!", trigger: "54" }],
              placeholder: "Finalizou",
            },
            {
              id: "54",
              message: "Obrigado por reportar!",
              trigger: "55",
            },
            {
              id: "55",
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
            null
        }

        <div className="Versao-div">v 1.0.0</div>
      </header>
    </div>
  );
}

export default App;
