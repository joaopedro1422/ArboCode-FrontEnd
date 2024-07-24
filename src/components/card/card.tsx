import "./card.css";

interface CardProps{
    nomePlanta: string,
    descriçaoPlanta: string,
    porte: string,
    imagem: string,
    valor:number
 

}
export function Card({nomePlanta,descriçaoPlanta,porte,imagem,valor} : CardProps){
    const formatarValorMonetario = (valor: number) => {
        // Formata o valor como uma string de moeda
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      };
    return(
        <div className="card">
            <button className="btn-card-acesso">
            <div className="card-image">
                <img src={imagem}/>
            </div>
            <div className="card-content">
                <p className="card-name">{nomePlanta}</p>
                <p className="card-desc">{descriçaoPlanta}</p>
                <p className="card-valor">{formatarValorMonetario(valor)}</p>
                <button className="button-card">Comprar</button>
            </div>
            </button>
            
        </div>
    )
}