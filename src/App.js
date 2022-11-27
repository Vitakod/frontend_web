import "./App.css";
import ChatBot from "react-simple-chatbot";
import { useGeolocated } from "react-geolocated";
import { useState } from "react";

function App() {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated(
    {
      positionOptions: {
        enableHighAccuracy: false,
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
                "Obrigado por permitir a localização :)",
              trigger: "3"
            },
            {
              id: "3",
              options: [{ label: 'Ok', trigger: '4' }],
              trigger: "4",
            },
            {
              id: "4",
              message: "Hi {previousValue}, nice to meet you!",
              end: true,
            },
          ]
          } />

      </header>
    </div>
  )

}

export default App;
