import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Menu() {
    const percentage = 20;


    return(
        <Container>
            <Link to="/habitos" style={ {textDecoration: 'none'} }>
                <span>Hábitos</span>
            </Link>
            <Link to="/hoje" style={ {textDecoration: 'none'} }>
                <Botao>
                <CircularProgressbar
                    value={percentage}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    pathColor: "#fff",
                    trailColor: "transparent",
                    })}
                />
                <p>Hoje</p>
                </Botao>
            </Link>
            <Link to="/historico" style={ {textDecoration: 'none'} }>
                <span>Histórico</span>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0; 
    opacity: 1;
    z-index: 1;
    background-color: white;
    span {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        color: #52B6FF;
    }
`;

const Botao = styled.div`
    width: 91px;
    height: 91px;
    border-radius: 100px;
    background-color: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    z-index: 2;
    position: relative;
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        position: absolute;
        color: #FFFFFF !important;
        right: 25px;  
    }

`;