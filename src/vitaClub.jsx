import { useState } from "react"
import "./App.css";

const Pontos = () => {
    const [pontos, setPontos] = useState(0)

    return <div className="Pontos">
        <div>
            <span style={{ fontSize: '37px' }}>{pontos}</span>
            <h5 style={{ marginTop: '0px' }}>Pontos</h5>
        </div>

        <div className="Pontos_Principal">
            <h6>Programa de Pontos VitaClub</h6>

            <div className="Pontos_Coluna">
                <center>
                    <section className="Pontos_Card" style={{ marginTop: '-10px' }}>
                        <p className="Pontos_Titulo">Ganhando pontos</p>
                        <p className="Pontos_Descricao">Reportando atualizações sobre sua saude e/ou sua comunidade você acumula pontos</p>
                    </section>
                    <section className="Pontos_Card" style={{ marginTop: '110px' }}>
                        <p className="Pontos_Titulo">Pontos=Benefícios</p>
                        <p className="Pontos_Descricao">Você pode trocar seus pontos por beneficios como meia entrada em cinemas conveniados</p>
                    </section>
                </center>
            </div>

            <div className="Pontos_Coluna">
                <center>
                    <p className="Pontos_Numero" style={{ marginTop: '0px' }}>01</p>
                    <div className="Pontos_Espaco"></div>
                    <p className="Pontos_Numero">02</p>
                    <div className="Pontos_Espaco"></div>
                    <p className="Pontos_Numero">03</p>
                    <div className="Pontos_Espaco"></div>
                    <p className="Pontos_Numero">04</p>
                </center>
            </div>

            <div className="Pontos_Coluna">
                <center>
                    <section className="Pontos_Card" style={{ marginTop: '95px' }}>
                        <p className="Pontos_Titulo">Pontos</p>
                        <p className="Pontos_Descricao">Eles estao disponíveis em sua área pessoal após o login. Acesse clicando nos ...</p>
                    </section>
                    <section className="Pontos_Card" style={{ marginTop: '120px' }}>
                        <p className="Pontos_Titulo">Limite de pontos</p>
                        <p className="Pontos_Descricao">O usuário poderá acumular até 500 pontos por mês</p>
                    </section>
                </center>
            </div>

        </div>
    </div>
}

const Beneficios = () => {

}

export default function VitaClub() {
    const [conteudo, setConteudo] = useState('pontos')

    const Tela = conteudo == 'pontos' ? Pontos : Beneficios

    return <div className="VitaClub">
        <Tela />
    </div>
}