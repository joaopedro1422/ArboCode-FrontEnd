import React from 'react';
import './ExpandedCard.css';
import { AvaliacaoExpanded } from '../components/rating/AvaliaçaoExpanded.tsx';
import { useState } from 'react';
import { faArrowAltCircleLeft, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ExpandedCardProps {
    nomePlanta: string;
    descriçaoPlanta: string;
    porte: string;
    imagem: string;
    valor: number;
    onBack: () => void;
}

export function ExpandedCard({ nomePlanta, descriçaoPlanta, porte, imagem, valor, onBack }: ExpandedCardProps) {
    const formatarValorMonetario = (valor: number) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };
    const [rating, setRating] = useState(4);

    return (
        <div className='expanded-card'>
           <button className='btn-back' onClick={onBack}><FontAwesomeIcon className='icon-back' icon={faArrowCircleLeft}></FontAwesomeIcon></button>
            <div className="expanded-container">
                <div className="expanded-image">
                    <img src={imagem} alt={nomePlanta} />
                </div>
                <div className="expanded-content">
                    <h2 className="expanded-name">{nomePlanta}</h2>
                    <p className="expanded-desc">{descriçaoPlanta}</p>
                    <p className="expanded-porte">Porte: {porte}</p>
                    <AvaliacaoExpanded rating={rating} />
                    <p className="expanded-valor">{formatarValorMonetario(valor)}</p>
                    <p className='expanded-aVista'>à vista</p>
                    
                </div>
            </div>
        </div>
    );
}