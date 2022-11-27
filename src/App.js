import "./App.css";
import ChatBot from "react-simple-chatbot";
import { useGeolocated } from "react-geolocated";
import { useState } from "react";

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated(
    {
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    }
  )

  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false)
  const [usuarioLocalizacao, setUsuarioLocalizacao] = useState()

  const verificarLocalizacao = () => {
    if (coords) {
      setLocalizacaoAtiva(true)
      setUsuarioLocalizacao({ longitude: coords.longitude, latitude: coords.latitude })
    }
    else {
      alert("Por favor click no canto superior esquerdo para conceder acesso a localização")
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <ChatBot
          style={{ display: localizacaoAtiva ? 'none' : '' }}
          headerTitle="Verificando Localização"
          handleEnd={verificarLocalizacao}
          botDelay={2000}
          steps={[
            {
              id: "1",
              message:
                "Antes de começarmos precisamos acessar sua localização :)",
              trigger: "2"
            },
            {
              id: "2",
              options: [
                { label: 'Entendi' }
              ],
              end: true
            },
          ]}
        />

        <ChatBot
          style={{ display: !localizacaoAtiva ? 'none' : '' }}
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
                "Localização encontrada, vamos prosseguir :)",
              trigger: "3"
            },
            {
              id: "3",
              options: [{ label: 'Vamos lá!', trigger: '4' }],
              trigger: "4",
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
  )

}

export default App;
