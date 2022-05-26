import Topo from "./Topo"
import Menu from "./Menu"
import styled from "styled-components"

export default function Historico(){
    return(
        <>
            <Topo />
            <Container>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </Container>
            <Menu />
        </>
    )
}

const Container = styled.div`
    width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 120px;
    h1 {
        color:#126BA5;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 23px;
    }
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
    }
`;