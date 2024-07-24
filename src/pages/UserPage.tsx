import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "./UserPage.css";
import '../components/Dropdown.css';
import { Card } from './../components/card/card';
import { usePLantaData } from './../hooks/usePLantaData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarsStrokeRight, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { PlantaData } from '../interface/PlantaData';
import { CardUserPage } from '../components/card/cardUserPage';
import { ExpandedCard } from './ExpandedCard.tsx';
import { useNavigate } from "react-router-dom";


interface UserData {
    nomeCliente: string;
    cpfCliente: string;
    telefoneCliente: string;
    endereçoCliente: string;
    email: string;
    // Adicione outros campos conforme necessário
}
const API_URL = 'http://localhost:8080';
function UserPage() {
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(12);
    const { data, totalPages } = usePLantaData(page, limit);
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [userInfo, setUserInfo] = useState<UserData | null>(null);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const [selectedCard, setSelectedCard] = useState<PlantaData | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [searchText, setSearchText] = useState<string>('');
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [filter, setFilter] = useState<string | null>(null);
    const [showCatalog, setShowCatalog] = useState(true);
    const [showAccount, setShowAccount] = useState(false);

    const handleButtonAccountClick = () => {
        setShowCatalog(false);
        setShowAccount(true);
    }
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(API_URL+`/clientes/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                localStorage.setItem('user-data', JSON.stringify(response.data))
                setUserInfo(response.data);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        };

        if (userId && token) {
            fetchUserInfo();
        }
    }, [userId, token]);
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleCardClick = (plant: PlantaData) => {
        setSelectedCard(plant);
    };

    const handleBackClick = () => {
        setSelectedCard(null);
    };
    const [filteredPlants, setFilteredPlants] = useState<any[]>([]);

    const handleSearchSubmit = () => {
        // Filtrando as plantas com base no texto da pesquisa
        const filtered = data?.filter((plant: any) =>
            plant.nomePlanta.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchPerformed(true);
        setFilteredPlants(filtered || []);
    };
    const buttonStyle = (buttonFilter: string | null) => {
        return {
          backgroundColor: filter === buttonFilter ? 'transparent' : 'white',
          color: filter === buttonFilter ? 'white' : 'rgb(38, 121, 0)',
          cursor: 'pointer'
        };
      };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          handleSearchSubmit();
        }
      };

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value); // Atualiza o texto de pesquisa
      };

      useEffect(() => {
        console.log("Current Page:", page);
        console.log("Page limit:", limit);
    }, [page, limit]);

    const handlePageSizeChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(0);
    };
    
      
    return (
        <div className='home-user'>
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
                            <FontAwesomeIcon className='icon-user' icon={faUser} /> Olá, {userInfo?.nomeCliente} <span className="arrow">&#9662;</span>
                            </button>
                            <div className="dropdown-menu">
                                <a href="/accountPage" >Meus dados</a>
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
                <div  id='catalogo' className='container-userPage'>
                    {selectedCard ? (
                            <ExpandedCard
                            nomePlanta={selectedCard.nomePlanta}
                            descriçaoPlanta={selectedCard.descriçaoPlanta}
                            porte={selectedCard.porte}
                            imagem={selectedCard.imagem}
                            valor={selectedCard.valor}
                            onBack={handleBackClick}
                        />
                        ) : (
                            <div  className='container-filtro'>
                            <div  className='card-grid-user'>
                            {searchPerformed ? (
                                filteredPlants.map((plantaData, index) => (
                                    <CardUserPage
                                        key={plantaData.id}
                                        nomePlanta={plantaData.nomePlanta}
                                        descriçaoPlanta={plantaData.descriçaoPlanta}
                                        porte={plantaData.porte}
                                        imagem={plantaData.imagem}
                                        valor={plantaData.valor}
                                        onClick={() => handleCardClick(plantaData)}
                                    />
                                ))
                            ) : (
                                data?.map((plantaData, index) => (
                                    <CardUserPage
                                        key={plantaData.id}
                                        nomePlanta={plantaData.nomePlanta}
                                        descriçaoPlanta={plantaData.descriçaoPlanta}
                                        porte={plantaData.porte}
                                        imagem={plantaData.imagem}
                                        valor={plantaData.valor}
                                        onClick={() => handleCardClick(plantaData)}
                                    />
                            ))
                        )
                        }
                            </div>
                            <div className='pagination'>
                            <button onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>
                                Voltar
                            </button>
                            <span>{page + 1} de {totalPages}</span>
                            <button onClick={() => setPage(prev => (prev + 1 < totalPages ? prev + 1 : prev))} disabled={page + 1 >= totalPages}>
                                Proxima
                            </button>
                        </div>
                            </div>
                        )}
            
            </div>
            <div className="end-container">
                    <img className='icon-email' src="/src/assets/icon-telefone.png" alt="" />
                    <p>Contato : (83) 98891-9553</p>
                    <img className='icon-email' src="/src/assets/icon-email.png" alt="" />
                    <p>Email : jpcros40414@gmail.com</p>
                    <img className='icon-email' src="/src/assets/social.png" alt="" />
                    <p>GitHub : https://github.com/joaopedro1422</p>
                </div>
            
        </div>
    );
}

export default UserPage;