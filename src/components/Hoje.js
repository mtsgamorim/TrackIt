import styled from "styled-components";
import dayjs from "dayjs";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";

import Topo from "./Topo";
import Menu from "./Menu";


function Habito({habito, setHabitosDia}) {
    console.log(habito);
    const { usuario, setUsuario } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }
    function check() {
        if (habito.done === false) {
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, {}, config);
            promise.then(res => {
                const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
                promise.then(resposta => {
                    setHabitosDia(resposta.data);
                })
            })
        }else{
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, {}, config);
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
                <p>Sequência atual: {habito.currentSequence} dias</p>
                <p>Seu recorde: {habito.highestSequence} dias</p>
            </Container>
            <Button onClick={check} habito={habito}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </Button>
        </Flex>
    )
}

export default function Hoje(){
    console.log(dayjs().format('d'))
    let diaSemana = "";
    let data = dayjs().format('DD/MM');
    const [habitosConcluidos, setHabitosConcluidos] = useState(0);
    const { usuario, setUsuario, habitosDia, setHabitosDia } = useContext(UserContext);
    const config = {
        headers: {
            "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
        }
    }
    if(dayjs().format('d') == 0) {
        diaSemana = "Domingo";
    }else if (dayjs().format('d') == 1){
        diaSemana = "Segunda";
    }else if (dayjs().format('d') == 2){
        diaSemana = "Terça";
    }else if (dayjs().format('d') == 3){
        diaSemana = "Quarta";
    }else if (dayjs().format('d') == 4){
        diaSemana = "Quinta";
    }else if (dayjs().format('d') == 5){
        diaSemana = "Sexta";
    }else if (dayjs().format('d') == 6){
        diaSemana = "Sabado";
    }

    useEffect(()=> {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(resposta => {
            setHabitosDia(resposta.data);
            console.log(resposta.data);
        })
    }, []);

    return(
    <Tela>
        <Topo />
            <h1>{diaSemana}, {data}</h1>
            {habitosConcluidos === 0 ? <h2>Nenhum hábito concluído ainda</h2> : <h3>67% dos hábitos concluídos</h3>}
            {habitosDia.map((habito, index) => <Habito key={index} habito={habito} setHabitosDia={setHabitosDia} />)}
        
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
