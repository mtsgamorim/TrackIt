import axios from "axios"
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import logo from "../assents/logo.png"

export default function Home(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState("");

    //LOGIN: EMAIL PESSOAL  SENHA: TESTE
    
    const navigate = useNavigate();
    function fazerLogin(event) {
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: email,
            password: senha
        });
        promise.then((res) => {
            setToken(res.data.token);
            navigate("/hoje",{state:{token:token}});
        })

        promise.catch((err) => {
            alert("Falha");
        })
    }
        

    return(
        <Container>
            <img src={logo} alt="TrackIt"/>
            <form onSubmit={fazerLogin}>
                <input placeholder="email" type="email" value={email} required onChange={e => setEmail(e.target.value)}/>
                <input placeholder="senha" type="password" value={senha} required onChange={e => setSenha(e.target.value)}/>
                <button type="submit"><span>Entrar</span></button>
            </form>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    img {
        width: 180px;
        height: 178px;
        margin-bottom: 20px;
    }
    p {
        color: #52B6FF;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 14px;
        text-decoration-line: underline;
        margin-top: 30px;
    }
    form {
        display: flex;
        flex-direction: column;

        input {
            width: 303px;
            height: 45px;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            margin-bottom: 5px;
            ::placeholder {
                color: #DBDBDB;
                font-family: 'Lexend Deca';
                font-weight: 400;
                font-size: 20px;
            }
        }
        button {
            height: 45px;
            background-color: #52B6FF;
            border-radius: 4.63636px;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                font-family: 'Lexend Deca';
                font-weight: 400;
                font-size: 21px;
                color: #FFFFFF;
            }
        }
    }
`;