import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import UserContext from "../contexts/UserContext";
import Home from "./Home"
import Cadastro from "./Cadastro"
import Habitos from "./Habitos"
import Hoje from "./Hoje"
import Historico from "./Historico"



export default function App() {
    const [usuario, setUsuario] = useState({});
    const [habitosDia, setHabitosDia] = useState([]);
    const contextValue = { usuario, setUsuario, habitosDia, setHabitosDia };
    return (
        <UserContext.Provider value={contextValue} >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/habitos" element={<Habitos />} />
                    <Route path="/hoje" element={<Hoje />} />
                    <Route path="/historico" element={<Historico />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}