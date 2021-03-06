import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";
import { createGlobalStyle } from 'styled-components'
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

import Topo from "./Topo";
import Menu from "./Menu";


function Habito({habito, setHabitosDia}) {
    const { usuario } = useContext(UserContext);
    const [mudaCor, setMudaCor] = useState(false);
    const [mudaCor2, setMudaCor2] = useState(false);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }
    function check() {
        if (habito.done === false) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, {}, config);
            promise.then(res => {
                setMudaCor(true);
                if(habito.currentSequence === habito.highestSequence){
                    setMudaCor2(true);
                }
                const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
                promise.then(resposta => {
                    setHabitosDia(resposta.data);
                })
            })
        }else{
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, {}, config);
            setMudaCor(false);
            setMudaCor2(false);
            promise.then(res => {
                const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
                promise.then(resposta => {
                    setHabitosDia(resposta.data);
                })
            })
        }
    }
    
    return(
        <Flex>
            <Container>
                <h4>{habito.name}</h4>
                <Sequencia mudaCor={mudaCor}><p>Sequência atual: <span>{habito.currentSequence} dias</span></p></Sequencia>
                <Record mudaCor2={mudaCor2}><p>Seu recorde: <span>{habito.highestSequence} dias</span></p></Record>
            </Container>
            <Button onClick={check} habito={habito}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </Button>
        </Flex>
    )
}

export default function Hoje(){
    let diaSemana = "";
    let percentage = 0;
    let data = dayjs().format('DD/MM');
    const { usuario, habitosDia, setHabitosDia } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }
    let soma = 0;
    for(let i = 0; i < habitosDia.length; i++){
        if(habitosDia[i].done){
            soma = soma + 1
        }
    }
    percentage = soma * 100 / habitosDia.length;
    
    if(dayjs().format('d') === 0) {
        diaSemana = "Domingo";
    }else if (dayjs().format('d') === "1"){
        diaSemana = "Segunda";
    }else if (dayjs().format('d') === "2"){
        diaSemana = "Terça";
    }else if (dayjs().format('d') === "3"){
        diaSemana = "Quarta";
    }else if (dayjs().format('d') === "4"){
        diaSemana = "Quinta";
    }else if (dayjs().format('d') === "5"){
        diaSemana = "Sexta";
    }else if (dayjs().format('d') === "6"){
        diaSemana = "Sabado";
    }

    useEffect(()=> {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(resposta => {
            setHabitosDia(resposta.data);
        })
    }, []);

    return(
    <Tela>
        <GlobalStyle/>
        <Topo />
            <h1>{diaSemana}, {data}</h1>
            {percentage === 0 || isNaN(percentage) ? <h2>Nenhum hábito concluído ainda</h2> : <h3>{percentage.toFixed(0)}% dos hábitos concluídos</h3>}
            <Ultimo>
            {habitosDia.map((habito, index) => <Habito key={index} habito={habito} setHabitosDia={setHabitosDia} />)}
            </Ultimo>
        
        <Menu />
    </Tela>
    )
}




const Tela = styled.div`
    background-color: #E5E5E5;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    h1 {
        margin-top: 100px;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        color: #126BA5;
        margin-left: 15px;
    }
    h2{
        color: #BABABA;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        margin-left: 15px;
    }
    h3{
        color: #8FC549;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        margin-left: 15px;
        margin-top: 5px;
    }
`;

const Container = styled.div`
    
    h4 {
        color:#666666;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        margin-left: 10px;
    }
    
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 13px;
        color: #666666;
        margin-left: 10px;
    }
    span{
        color: ${(props) => props.mudaCor ? "#8FC549" : "#666666"};
    }
`;

const Flex = styled.div`
    height: 94px;
    width: 95%;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-left: 5px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    :last-child{
        margin-bottom: 100px;
    }
`;

const Button = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 69px;
    height: 69px;
    background-color:${(props) => (props.habito.done ? "#8FC549" : "#EBEBEB")}; 
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    margin-right: 10px;
    ion-icon {
        height: 50px;
        width: 50px;
        color: #FFFFFF;
    }
`;

const Ultimo = styled.div`
    :last-child{
        margin-bottom: 80px;
    }
`;

const Sequencia = styled.div`
    margin-left: 10px;
    p{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 13px;
        color: "#666666";
        margin-left: 10px;
        margin-left: 0px;
    }
    span {
        color: ${(props) => props.mudaCor ? "#8FC549" : "#666666"};
    }
`;

const Record = styled.div`
    margin-left: 10px;
    p{
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 13px;
        color: "#666666";
        margin-left: 10px;
        margin-left: 0px;
    }
    span {
        color: ${(props) => props.mudaCor2 ? "#8FC549" : "#666666"};
    }
    
`;
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E5E5E5;
  }
`
