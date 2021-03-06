import axios from "axios"
import styled from "styled-components"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'

import logo from "../assents/logo.png"


export default function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [animation, setAnimation] = useState(false);


    const navigate = useNavigate();


    function fazerCadastro(event) {
        setAnimation(true);
        event.preventDefault();
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", {
            email: email,
            name: nome,
            image: foto,
            password: senha
        })
        promise.then(res => {
            navigate("/");
        })
        promise.catch(err => {
            alert("Problema na criação");
            setAnimation(false);
        })
    }

    function redirecionar(){
        if(!animation){
            navigate("/");
        }
    }
    return (
        <Container>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={fazerCadastro}>
                {animation ? <input
                    placeholder="email"
                    type="email" value={email}
                    required
                    disabled
                    onChange={e => setEmail(e.target.value)}
                /> : <input
                    placeholder="email"
                    type="email" value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                />}
                {animation ? <input
                    placeholder="senha"
                    type="password"
                    value={senha}
                    required
                    disabled
                    onChange={e => setSenha(e.target.value)}
                /> : <input
                    placeholder="senha"
                    type="password"
                    value={senha}
                    required
                    onChange={e => setSenha(e.target.value)}
                />}
                {animation ? <input
                    placeholder="nome"
                    type="text"
                    value={nome}
                    required
                    disabled
                    onChange={e => setNome(e.target.value)}
                /> : <input
                    placeholder="nome"
                    type="text"
                    value={nome}
                    required
                    onChange={e => setNome(e.target.value)}
                />}
                {animation ? <input
                    placeholder="nome"
                    type="url"
                    value={foto}
                    required
                    disabled
                    onChange={e => setFoto(e.target.value)}
                /> : <input
                    placeholder="foto"
                    type="url"
                    value={foto}
                    required
                    onChange={e => setFoto(e.target.value)}
                />}
                {animation ? <Desativa><ThreeDots color="#00BFFF" height={80} width={80} /></Desativa> : <button type="submit"><span>Cadastrar</span></button>}
                
            </form>
            <div onClick={redirecionar}>
                <p>Já tem uma conta? Faça login!</p>
            </div>
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
            opacity:1;
            span {
                font-family: 'Lexend Deca';
                font-weight: 400;
                font-size: 21px;
                color: #FFFFFF;
            }
        }
    }
`;

const Desativa = styled.div`
    height: 45px;
    background-color: #52B6FF;
    border-radius: 4.63636px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity:0.7;
`;