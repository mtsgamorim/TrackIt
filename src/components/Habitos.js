import styled from "styled-components"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"
import { ThreeDots } from 'react-loader-spinner';

import Topo from "./Topo"
import Menu from "./Menu"
import MeuHabito from "./MeuHabito"


function BotaoSemana({name, day, diasSelecionado, setDiasSelecionado, travarInput}){
    const [selecionei, setSelecionei] = useState(false);
    function marcaDia() {
        if (!travarInput) {
            let aux = [...diasSelecionado]
            if (!selecionei) {
                setSelecionei(true);
                aux.push(day);
                setDiasSelecionado(aux);
            } else {
                setSelecionei(false);
                aux = aux.filter((f) => f !== day);
                setDiasSelecionado(aux);
            }
        } 
    }
    return(
        <SelecionarSemana onClick={marcaDia} selecionei={selecionei}>
            <span>{name}</span>
        </SelecionarSemana>
    )
}

function CriacaoHabito({adicionar, setAdicionar, setHabitos}){
    const [criarHabito, setCriarHabito] = useState("");
    const [diasSelecionado, setDiasSelecionado] = useState([]);
    const { usuario, setUsuario } = useContext(UserContext);
    const [travarInput, setTravarInput] = useState(false);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }
    const BotoesSemana = [
        {
            name: "D" ,
            day: 0
        },
        {
            name: "S" ,
            day: 1
        },
        {
            name: "T" ,
            day: 2
        },
        {
            name: "Q" ,
            day: 3
        },
        {
            name: "Q" ,
            day: 4
        },
        {
            name: "S" ,
            day: 5
        },
        {
            name: "S" ,
            day: 6
        }
    ]
    function enviar(){
        if(!travarInput){
            if (criarHabito !== "" && diasSelecionado.length !== 0) {
                setTravarInput(true);
                const envio = {
                    "name": criarHabito,
                    "days": diasSelecionado
                }
                const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", envio, config);
                promise.then((res) => {
                    setTravarInput(false)
                    setAdicionar(false);
                    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
                    promise.then(resposta => {
                        setHabitos(resposta.data);
                        setCriarHabito("");
                    })
                });
                promise.catch((err) => alert(`Erro no envio: ${err.message}`));
            }else {
                alert("Alguns dados não foram preenchidos");
            }
        }
    }
    function voltar(){
        if(!travarInput){
            setAdicionar(false);
        }
    }
    if(adicionar){
        return(
            <Engloba>
                <AreaCriar>
                    {travarInput ? <input
                        placeholder="nome do hábito"
                        value={criarHabito}
                        onChange={e => setCriarHabito(e.target.value)}
                        disabled
                    /> : <input
                    placeholder="nome do hábito"
                    value={criarHabito}
                    onChange={e => setCriarHabito(e.target.value)}
                />}
                    
                </AreaCriar>
                <WeekButtons>
                    {BotoesSemana.map((semana, index) => <BotaoSemana key={index} name={semana.name} day={semana.day} diasSelecionado={diasSelecionado} setDiasSelecionado={setDiasSelecionado} travarInput={travarInput}/>)}
                </WeekButtons>
                <AreaSalvar>
                {travarInput ? <BotaoFake><ThreeDots color="#00BFFF" height={80} width={80} /></BotaoFake> : <BotaoReal onClick={enviar}><span>Salvar</span></BotaoReal>}
                <h4 onClick={voltar}>Cancelar</h4>
                </AreaSalvar>
            </Engloba>
        )
    }
    else{
        return(
            <>
            </>
        )
    }

}

function RenderizarHabitos({habitos, setHabitos}){
    if(habitos.length === 0){
        return (
            <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
        )
    }else {
        return(
            <>
                {habitos.map((habito, index) => <MeuHabito key={index} habito={habito} setHabitos={setHabitos}/>)}
            </>
        )
        
    }
}

export default function Habitos(){

    const [habitos, setHabitos] = useState([]);
    const { usuario, setUsuario } = useContext(UserContext);
    const [adicionar, setAdicionar]  = useState(false);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }

    useEffect(()=> {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then(resposta => {
            setHabitos(resposta.data);
        })
    }, []);


    
    return(
        <Tela>
            <Topo />
            <ContainerTopo>
                <h1>Meus hábitos</h1>
                <Botao onClick={() => setAdicionar(true)}>
                    <ion-icon name="add-outline"></ion-icon>
                </Botao>
            </ContainerTopo>
            <CriacaoHabito adicionar={adicionar} setAdicionar={setAdicionar} setHabitos={setHabitos}/>
            <RenderizarHabitos habitos={habitos} setHabitos={setHabitos}/>
            <Menu />
        </Tela>
    )
}


const ContainerTopo = styled.div`
   margin-top: 70px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   h1 {
        color:#126BA5;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        margin-left: 20px;
        margin-top: 30px;
        margin-bottom: 10px;
    }
`;

const Tela = styled.div`
    background-color: #E5E5E5;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    h3 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        margin-left: 20px;
        margin-top: 20px;
        color: #666666;
    }
`;

const Botao = styled.div`
    width: 40px;
    height: 35px;
    border-radius: 5px;
    background-color: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-top: 15px;
    ion-icon {
        background-color: #52B6FF;
        color: #FFFFFF;
        width: 30px;
        height: 25px;
    }
`;

const WeekButtons = styled.div`
    display: flex;
    margin-left: 35px;
    margin-top: 10px;
`;

const SelecionarSemana = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    background-color: ${(props) => (props.selecionei ? "#CFCFCF" : "#FFFFFF")};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    span {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        color: ${(props) => (props.selecionei ? "#FFFFFF" : "#DBDBDB")};
    }
`;

const AreaCriar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    input {
        margin-top: 10px;
        width: 80%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-left: auto;
        margin-right: auto;
        ::placeholder {
                color: #DBDBDB;
                font-family: 'Lexend Deca';
                font-weight: 400;
                font-size: 20px;
            }
    }
`;

const Engloba = styled.div`
    background-color: #FFFFFF;
    padding-top: 10px;
    padding-bottom: 20px;
    width: 340px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 5px;
`;

const AreaSalvar = styled.div`
    display: flex;
    flex-direction: row-reverse;
    h4 {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 16px;
        color: #52B6FF;
        margin-right: 30px;
        margin-top: 20px;
    }
`;

const BotaoFake = styled.div`
    width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-right: 20px;
`;

const BotaoReal = styled.div`
    width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-right: 20px;
        span {
            color: #FFFFFF;
            font-family: 'Lexend Deca';
            font-weight: 400;
            font-size: 16px;
        }
`;