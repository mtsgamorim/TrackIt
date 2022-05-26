import Topo from "./Topo"
import Menu from "./Menu"
import styled from "styled-components"

export default function Historico(){
    return(
        <Tela>
            <Container>
                <Topo />

                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                <Menu />
            </Container>
        </Tela>
    )
}

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
    h1 {
        color:#126BA5;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
        margin-left: 20px;
        margin-top: 100px;
        margin-bottom: 10px;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        margin-left: 20px;
        color: #666666;
    }
`;

const Background = styled.div`
    background-color: #E5E5E5;
    height: 120px;
    
`;

const Tela = styled.div`
    background-color: #E5E5E5;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;