import "./App.css";
import VitaClub from "./components/vitaClub";
import ChatBot from "react-simple-chatbot";
import AnimatedMulti from "./components/AnimateMult";
import { useGeolocated } from "react-geolocated";
import { useState } from "react";

function App() {
  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false);
  const [usuarioLocalizacao, setUsuarioLocalizacao] = useState();
  const [sintomas, setSintomas] = useState([]);

  const handleEnd = ({ steps, values }) => {
    const filtro = (valores, palavraChave) => {
      if (
        valores.find(
          (valor) => typeof valor == "string" && valor.includes(palavraChave)
        )
      )
        return parseInt(
          valores
            .find(
              (valor) =>
                typeof valor == "string" && valor.includes(palavraChave)
            )
            .split("=")[1]
        );
      else return null;
    };

    let email;
    let senha;
    let cpf;
    let faixaEtaria = 0;
    let sexo = 0;

    if (filtro(values, "Indentificacao") === 1) {
      if (filtro(values, "MetodoIndentificacao") === 1) {
        email = values[2];
        senha = values[3];
        cpf = values[4];
        faixaEtaria = filtro(values, "faixaEtaria");
        sexo = filtro(values, "sexo");
      } else {
        email = values[2];
        senha = values[3];
      }
    } else {
      faixaEtaria = filtro(values, "faixaEtaria");
      sexo = filtro(values, "sexo");
    }

    const sintomasLista = sintomas.map((valor) => ({
      tipo: valor,
      descricao: "descricao",
    }));

    console.log(cpf, senha, email);

    let headersList = {
      Accept: "/",
      "User-Agent": "Thunder Client (https://www.thunderclient.com/)",
      "Content-Type": "application/json",
    };

    const dadosJson = JSON.stringify({
      user_id: null,
      sexo,
      faixa_etaria: faixaEtaria,
      lat: usuarioLocalizacao.latitude,
      lng: usuarioLocalizacao.longitude,
      sintomas: sintomasLista,
    });

    fetch("https://vitakod-api.herokuapp.com/save_data", {
      method: "POST",
      body: dadosJson,
      headers: headersList,
    }).then((response) => {
      console.log("deu certo");
      console.log(response);
    });
  };

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [tela, setTela] = useState("chat");

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
    setSintomas(sintomasValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <ChatBot
          style={{ display: localizacaoAtiva ? "none" : "" }}
          headerTitle="Verificando Localização"
          handleEnd={verificarLocalizacao}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#38f" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Aceite a localização."}
          botDelay={2000}
          steps={[
            {
              id: "ola",
              message: "Olá!",
              trigger: "localizacao-1",
            },
            {
              id: "localizacao-1",
              message:
                "Antes de começarmos preciso que você nos conceda sua localização para o navegador :)",
              trigger: "localizacao-2",
            },
            {
              id: "localizacao-2",
              options: [{ label: "Entendi" }],
              end: true,
            },
          ]}
        />

        <button
          className="Mais"
          style={{
            display: !localizacaoAtiva || tela !== "chat" ? "none" : "",
          }}
          onClick={() => setTela("VitaClub")}
        >
          ...
        </button>

        <ChatBot
          handleEnd={handleEnd}
          style={{
            display: !localizacaoAtiva || tela !== "chat" ? "none" : "",
          }}
          headerTitle="Vitabot"
          // speechSynthesis={{ enable: true, lang: "pt-BR" }}
          bubbleStyle={{ backgroundColor: "white", color: "#444" }}
          bubbleOptionStyle={{ backgroundColor: "#38f" }}
          contentStyle={{ backgroundColor: "#eee" }}
          placeholder={"Escreva sua resposta..."}
          steps={[
            {
              id: "sintomas-1",
              message: "Conte-me como você está se sentindo",
              trigger: "sintomas-2",
            },
            {
              id: "sintomas-2",
              component: (
                <AnimatedMulti
                  onChange={(valores) => handleSintomas(valores)}
                />
              ),
              placeholder: "Marque as opções",
              delay: 2000,
              trigger: "finalizou-sintomas-1",
            },
            {
              id: "finalizou-sintomas-1",
              message: "Finalizou?",
              delay: 5000,
              trigger: "finalizou-sintomas-2",
            },
            {
              id: "finalizou-sintomas-2",
              options: [
                { value: 1, label: "Sim!", trigger: "identificacao-nome-1" },
              ],
              placeholder: "Marque: 'Sim' se finalizou.",
            },

            //#region IDENTIFICAÇÃO
            {
              id: "identificacao-nome-1",
              message: "Digite seu nome:",
              trigger: "identificacao-nome-2",
            },
            {
              id: "identificacao-nome-2",
              user: true,
              trigger: "identificacao-cpf-1",
            },
            {
              id: "identificacao-cpf-1",
              message: "Digite seu CPF:",
              trigger: "identificacao-cpf-2",
            },
            {
              id: "identificacao-cpf-2",
              user: true,
              trigger: "identificacao-idade-1",
            },
            {
              id: "identificacao-idade-1",
              message: "Selecione sua faixa etária:",
              trigger: "identificacao-idade-2",
              placeholder: "Escolha uma opção",
            },
            {
              id: "identificacao-idade-2",
              options: [
                {
                  value: "faixaEtaria=1",
                  label: "Até 17 anos",
                  trigger: "identificacao-sexo-1",
                },
                {
                  value: "faixaEtaria=2",
                  label: "18 - 60 anos",
                  trigger: "identificacao-sexo-1",
                },
                {
                  value: "faixaEtaria=3",
                  label: "Mais de 60 anos",
                  trigger: "identificacao-sexo-1",
                },
              ],
              placeholder: "Escolha uma opção",
            },
            {
              id: "identificacao-sexo-1",
              message: "Qual é o seu sexo?",
              trigger: "identificacao-8",
            },
            {
              id: "identificacao-8",
              options: [
                { value: "sexo=0", label: "Feminino", trigger: "obrigado" },
                { value: "sexo=1", label: "Masculino", trigger: "obrigado" },
              ],
              placeholder: "Escolha uma opção",
            },
            //#endregion

            {
              id: "obrigado",
              message: "Obrigado por reportar!",
              trigger: "fim",
            },
            {
              id: "fim",
              message: "Fim",
              end: true,
            },
          ]}
        />
        {tela !== "chat" ? (
          <div>
            <VitaClub />
            <button className="Voltar" onClick={() => setTela("chat")}>
              ⏪
            </button>
          </div>
        ) : null}

        <div className="Versao-div">v 2.2.2</div>
      </header>
    </div>
  );
}

export default App;
