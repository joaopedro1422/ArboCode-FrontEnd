import "./accountPage.css";
import React, { useEffect, useState, useRef } from 'react';
import { useLoginRequest } from "../hooks/useLoginRequest";
import { LoginData } from "../interface/LoginData";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarsStrokeRight, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
interface UserData {
    nomeCliente: string;
    cpfCliente: string;
    telefoneCliente: string;
    endereçoCliente: string;
    email: string;
    // Adicione outros campos conforme necessário
}
function AccountPage(){
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [filter, setFilter] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUserData = localStorage.getItem('user-data');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserData(parsedUserData);
        }
    }, []);
    const userId = localStorage.getItem('userId');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value); // Atualiza o texto de pesquisa
      };
      const buttonStyle = (buttonFilter: string | null) => {
        return {
          backgroundColor: filter === buttonFilter ? 'transparent' : 'white',
          color: filter === buttonFilter ? 'white' : 'rgb(38, 121, 0)',
          cursor: 'pointer'
        };
      };
    
    
    const [filteredPlants, setFilteredPlants] = useState<any[]>([]);

    const handleSearchSubmit = () => {
        navigate(`/userPage/${userId}`); 
    };
    const handleBackClick = () => {
        navigate(`/userPage/${userId}`); 
    };
    return(
            <div>
                <header id="header">
                <div className="container-nav-user">
                    <div className="flex-user">
                        <h1 onClick={handleBackClick} className='icone-principal-user'>ARBOCODE</h1>
        
                        <nav>
                            <input className='search-user' placeholder="Qual árvore você está procurando ?"  value={searchText} 
                        onChange={handleInputChange}
                         />
                        </nav>
                        <button className='btn-search' onClick={handleSearchSubmit} > <FontAwesomeIcon className='icon-search' icon={faSearch}></FontAwesomeIcon> </button>
                        <div 
                            className={`dropdown ${isOpen ? 'open' : ''}`} 
                            ref={dropdownRef}
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <button className="dropdown-toggle" onClick={toggleDropdown}>
                            <FontAwesomeIcon className='icon-user' icon={faUser} /> Olá, {userData?.nomeCliente} <span className="arrow">&#9662;</span>
                            </button>
                            <div className="dropdown-menu">
                                <a href="/accountPage/${userId}">Meus dados</a>
                                <a href="#">Minhas solicitaçoes</a>
                                <a href="#">Sair</a>
                            </div>
                        </div>
                        <button className='btn-carrinho'> <FontAwesomeIcon className='icon-cart' icon={faShoppingCart}></FontAwesomeIcon> </button>
                    </div>
                </div>
                <div className="filter">
                    <h3>Filtrar por porte:</h3>
                    <button style={buttonStyle(null)} onClick={() => setFilter(null)}>Todos</button>
                    <button style={buttonStyle('Pequeno')} onClick={() => setFilter('Pequeno')}>Pequeno</button>
                    <button style={buttonStyle('Médio')} onClick={() => setFilter('Médio')}>Médio</button>
                    <button style={buttonStyle('Grande')} onClick={() => setFilter('Grande')}>Grande</button>
                </div>
            </header>
            <div className="container-userData">
                <h1>{userData?.email}</h1>
                <h2>{userData?.telefoneCliente}</h2>
                <h3>{userData?.endereçoCliente}</h3>
            </div>
            </div>
    )
}

export default AccountPage