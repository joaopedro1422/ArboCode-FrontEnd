import { useState } from "react"
import { useLoginRequest } from "../../../hooks/useLoginRequest";
import { LoginData } from "../../../interface/LoginData";
import "./modal.css"

interface InputProps{
    label:string,
    value: string|number,
    updateValue(value:any):void
}

const Input = ({label,value,updateValue}:InputProps) => {
    return(
        <>
            <label>{label}</label>
            <input value={value} onChange={e=>updateValue(e.target.value)}></input>
        </>
    )
}

interface CreateModalProps{

}
export function CreateModal(props:CreateModalProps){
    const [email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    const { mutate }= useLoginRequest();
    const submit=()=>{
        const loginData: LoginData={
            email,
            senha
        }
        mutate(loginData)
    }
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Login</h2>
                <form className="input-container">
                    <Input>label=email value={email} updateValue={setEmail}</Input>
                    <Input>label=Senha value={senha} updateValue={setSenha}</Input>
                </form>
                <button onClick={submit} className="btn-submitLogin">Login</button> 
            </div>
        </div>
    )
}