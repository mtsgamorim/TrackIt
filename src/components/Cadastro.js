import axios from "axios"
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import logo from "../assents/logo.png"


export default function Cadastro(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();

    function fazerCadastro(event){
        event.preventDefault();
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up" , {
            email: email,
            name: nome,
            image: foto,
            password: senha
        })
        promise.then(res => {
            navigate("/");
            // FALTA ANIMAÇÃO
        })
        promise.catch(err => {
            alert("Problema na criação");
            // FALTA ANIMAÇÃO
        })
    }
    return(
        <Container>
            <img src={logo} alt="TrackIt"/>
            <form onSubmit={fazerCadastro}>
                <input placeholder="email" type="email" value={email} required onChange={e => setEmail(e.target.value)}/>
                <input placeholder="senha" type="password" value={senha} required onChange={e => setSenha(e.target.value)}/>
                <input placeholder="nome" type="text" value={nome} required onChange={e => setNome(e.target.value)}/>
                <input placeholder="foto" type="url" value={foto} required onChange={e => setFoto(e.target.value)}/>
                <button type="submit"><span>Cadastrar</span></button>
            </form>
            <Link to="/cadastro">
                <p>Já tem uma conta? Faça login!</p>
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