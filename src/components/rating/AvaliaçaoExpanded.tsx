import React from 'react';
import ReactStars from 'react-stars';
import './AvaliaçaoExpanded.css'; // Adicione um arquivo CSS se desejar estilizar

interface StarRatingProps {
    rating: number; // Avaliação do produto (de 0 a 5)
}

export const AvaliacaoExpanded: React.FC<StarRatingProps> = ({ rating }) => {
    const renderStars = () => {
      const filledStars = Math.round(rating); // Arredonda a avaliação para o número inteiro mais próximo
      const emptyStars = 5 - filledStars; // Calcula o número de estrelas vazias
  
      // Array para armazenar as estrelas preenchidas e vazias
      let stars = [];
  
      // Adiciona estrelas preenchidas
      for (let i = 0; i < filledStars; i++) {
        stars.push(<span key={`filled-${i}`} className="star-filled">&#9733;</span>);
      }
  
      // Adiciona estrelas vazias
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty-${i}`} className="star">&#9733;</span>);
      }
  
      return stars;
    };
  
    return (
      <div className="star-rating">
        {renderStars()}
      </div>
    );
  };