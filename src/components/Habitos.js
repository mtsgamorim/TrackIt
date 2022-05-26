import styled from "styled-components"
import axios from "axios"

import Topo from "./Topo"
import Menu from "./Menu"

export default function Habitos(){
    return(
    <Tela>
        <Container>
            <Topo />


            <Menu />
        </Container>
    </Tela>
    )
}


const Container = styled.div`
    background-color: #E5E5E5;
    height: 100vh;
`;

const Tela = styled.div`
    background-color: #E5E5E5;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;