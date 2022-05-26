import styled from "styled-components"
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import UserContext from "../contexts/UserContext"

import Topo from "./Topo"
import Menu from "./Menu"


function RenderizarHabitos({habitos}){
    if(habitos.length === 0){
        return (
            <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
        )
    }else {
        return(
            <h3>Oiii</h3>
        )
        
    }
}

export default function Habitos(){

    const [habitos, setHabitos] = useState([]);
    const { usuario, setUsuario } = useContext(UserContext);
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
                <Botao>
                    <ion-icon name="add-outline"></ion-icon>
                </Botao>
            </ContainerTopo>
            <RenderizarHabitos habitos={habitos}/>
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