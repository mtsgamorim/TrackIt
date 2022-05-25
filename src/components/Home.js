import axios from "axios"
import styled from "styled-components"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import { ThreeDots } from  'react-loader-spinner'

import logo from "../assents/logo.png"

export default function Home(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { usuario, setUsuario } = useContext(UserContext);
    const [animation, setAnimation] = useState(false);
    
    //LOGIN: EMAIL PESSOAL  SENHA: TESTE
    
    const navigate = useNavigate();
    function fazerLogin(event) {
        setAnimation(true);
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: email,
            password: senha
        });
        promise.then((res) => {
            setUsuario(res.data);
            navigate("/hoje");
        })

        promise.catch((err) => {
            alert("Falha");
            setAnimation(false);
        })
    }
        

    return(
        <Container>
            <img src={logo} alt="TrackIt"/>
            <form onSubmit={fazerLogin}>
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
                
                {animation ? <Desativa><ThreeDots color="#00BFFF" height={80} width={80} /></Desativa> : <button type="submit"><span>Entrar</span></button>}
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