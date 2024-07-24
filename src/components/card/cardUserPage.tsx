import { AvaliacaoCard } from "../rating/AvaliaçaoCard";
import {  AvaliacaoExpanded } from "../rating/AvaliaçaoExpanded";
import "./cardUser.css";
import { useState } from 'react';
interface CardProps{
    nomePlanta: string,
    descriçaoPlanta: string,
    porte: string,
    imagem: string,
    valor:number
    onClick: () => void;

}
export function CardUserPage({nomePlanta,descriçaoPlanta,porte,imagem,valor, onClick} : CardProps){
    const formatarValorMonetario = (valor: number) => {
        // Formata o valor como uma string de moeda
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      };
    const [rating, setRating] = useState(4);
    return(
        <div className="card-user" onClick={onClick}>
            
            <div className="card-image-user">
                <img src={imagem}/>
            </div>
            <div className="card-content-user">
                <p className="card-name-user">{nomePlanta}</p>
                <p className="card-desc-user">{descriçaoPlanta}</p>
                <AvaliacaoCard  rating={rating} />
                <p className="card-valor-user">{formatarValorMonetario(valor)}</p>
                <button className="button-card-user">Comprar</button>
            </div>

            
        </div>
    )
}