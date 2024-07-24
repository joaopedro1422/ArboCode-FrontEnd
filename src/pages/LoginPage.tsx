import "./LoginPage.css";
import { useState } from "react"
import { useLoginRequest } from "../hooks/useLoginRequest";
import { LoginData } from "../interface/LoginData";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface InputProps{
    label:string,
    value: string|number,
    updateValue(value:any):void
}



function LoginPage(){
    
    const [email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    const { mutate }= useLoginRequest();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const submit=()=>{
        const loginData: LoginData={
            email,
            senha
        };
    
        mutate(loginData, {
            onSuccess: (data) => {
                const { token, id } = data.data;
                localStorage.setItem('userToken', token);
                localStorage.setItem('userId', id);
                setError(null); // Limpa qualquer mensagem de erro existente
                // Armazene o usuário se necessário
                console.log('Login bem-sucedido:', id);
                
                navigate(`/userPage/${id}`); 
            },
            onError: (error) => {
                console.error('Erro de login:', error);
                setError('Email ou senha incorretos');
            }
        });
    };


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (error) {
            setError(null);
        }
    };

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value);
        if (error) {
            setError(null);
        }
    };
    
    return(
        <div className="pageLogin">
            <header id="header">
                <div className="container-nav-login">
                    <div className="flex">
                        <h1 className="name-arbocode">ArboCode</h1>
                        <a href="index.html"><i className="icone-principal-login">
                        </i></a>
                    </div>
                </div>
            </header>
            <div className="areaLogin">
                <h2 className="h-perguntalogin">Já sou cliente</h2>
                <div className="modal-overlay">
                    <div className="modal-body">
                    
                    <form className="input-container">
                    <input type="email" name="nome" value={email} onChange={handleEmailChange} placeholder="Email" className="input-login"/>
                    <input type="password" id="senha" name="senha" value={senha} onChange={handleSenhaChange} className="input-senha" placeholder="Senha"/>
                    </form>
                    {error && <p style={{ color: 'red' , fontFamily:'Arial', fontSize:'13px'}}>{error}</p>}
                <button onClick={submit} className="btn-submitLogin ">ACESSAR CONTA</button> 
                
                
                        <p className="text-login-demo">Demonstração <br /><br />Email : userdemo@ <br />Senha : 1234</p>
            </div>
            </div>
            </div>
            <div className="area-separator">
                <div className="separator"></div>
                <div className="areaRegistro">
                    <h2 className="h-headerRegistro">Criar conta</h2>
                    <div className="modal-overlay-registro">
                        <div className="divisao-1">
                        <input type="text" name="nome" value="" placeholder="Nome completo" className="input-registro-nome"/>
                        <input type="text" name="nome" value="" placeholder="Cpf" className="input-registro-cpf"  />
                        </div>
                        <div className="divisao-2">
                        <input type="text" name="nome" value="" placeholder="Telefone" className="input-registro-telefone"/>
                        <input type="text" name="nome" value="" placeholder="Email" className="input-registro-email"  />
                        </div>
                        
                        <input type="text" name="nome" value="" placeholder="Endereço" className="input-registro-endereço"/>
                        <input type="password" id="senha" name="senha" className="input-registro-senha" placeholder="Nova senha"/>
                        <div className="divisao-3">
                            <p className="p-data-nascimento">Data de nascimento:</p>
                            <input type="date" id="data" name="data" className="input-data-nascimento"></input>
                            <button onClick={submit} className="btn-submitRegistro">CRIAR CONTA</button> 
                        </div>
                        
                    </div>
                </div>
                
            </div>
            <script src="scripts.js"></script>
        </div>
    
    )
}

export default LoginPage