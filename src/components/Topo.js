import { useContext } from "react"
import styled from "styled-components"
import UserContext from "../contexts/UserContext"
import logo from "../assents/TrackIt.png"

export default function Topo() {
    const { usuario, setUsuario } = useContext(UserContext);
    console.log(usuario)
    return(
        <Container>
            <img src={logo} alt="TrackIt"/>
            <Usuario>
                <img src={usuario.image} alt="Perfil"/>
            </Usuario>
        </Container>
    )
}

const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    img {
        width: 97px;
        height: 40px;
        margin-left: 20px;
    }
`;

const Usuario = styled.div`
    img{
        border-radius: 98.5px;
        width: 51px;
        height: 51px;
        margin-right: 20px;   
    }
`;