import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";

function BotaoSemana({name, day, habito}){
    let selecionei = false;
    for(let i = 0; i < habito.length; i++){
        if(day === habito[i]){
            selecionei = true;
        }
    }
    return(
        <SelecionarSemana selecionei={selecionei}>
            <span>{name}</span>
        </SelecionarSemana>
    )
}

export default function MeuHabito({habito, setHabitos}){
    const [abrirConfirmacao, setAbrirConfirmacao] = useState(false);
    const { usuario, setUsuario } = useContext(UserContext);
   
    
    function confirma(){
        setAbrirConfirmacao(true);
    }
    function deletar(){
        const config = {
            headers: {
                "Authorization": `Bearer ${usuario.token}` //Padrão da API (Bearer Authentication)
            }
        }
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`, config);
        promise.then((res) => {
            setAbrirConfirmacao(false);
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
            promise.then(resposta => {
            setHabitos(resposta.data);
        })
        })

    }
    function cancelar(){
        setAbrirConfirmacao(false);
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
    return (
        <Habito>
            {abrirConfirmacao ?
            <>
            <h1>Você realmente deseja excluir esse Hábito?</h1>
            <Flex>
                <h5 onClick={deletar}>SIM</h5>
                <h5 onClick={cancelar}>NÃO</h5>
            </Flex>
            </>
            :
                <>
                    <Header>
                        <h2>{habito.name}</h2>
                        <div onClick={() => confirma()}>
                            <ion-icon name="trash-outline"></ion-icon>
                        </div>
                    </Header><WeekButtons>
                        {BotoesSemana.map((semana, index) => <BotaoSemana key={index} name={semana.name} day={semana.day} habito={habito.days} />)}
                    </WeekButtons>
                </> }
            
        </Habito>
    )
}

const Habito = styled.div`
    width: 340px;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-left: 20px;
    margin-top: 5px;
    h1 {
        color: #666666;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;

    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    h2 {
        color: #666666;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
        margin-left: 10px;
        margin-top: 10px;
    }
        ion-icon {
            width: 25px;
            height: 25px;
            margin-top: 5px;
        }
`;

const WeekButtons = styled.div`
    display: flex;
    margin-left: 12px;
    margin-top: 20px;
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

const Flex = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-around;
    h5 {
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 20px;
    }
`;