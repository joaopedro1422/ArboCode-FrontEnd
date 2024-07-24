;
import { CreateModal } from './../components/card/create-modal/create-modal';
import React, { useEffect } from 'react';
import { useState } from 'react';
import reactLogo from './../assets/react.svg';
import viteLogo from '/../vite.svg';
import { PlantaData , PaginatedResponse} from './../interface/PlantaData';
import { Card } from './../components/card/card';
import { usePLantaData } from './../hooks/usePLantaData'
function HomePage(){
    const [isModalOpen, setIsModalOpen]= useState(false);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(12);
    const { data, totalPages } = usePLantaData(page, limit);
    useEffect(() => {
        const handleOpenModal = () => {
        setIsModalOpen(prev=> !prev);
        };

        const loginButton = document.getElementById('btn-login');
        if (loginButton) {
        loginButton.addEventListener('click', handleOpenModal);
        }

        // Cleanup event listener on component unmount
        return () => {
        if (loginButton) {
            loginButton.removeEventListener('click', handleOpenModal);
        }
        };
    }, []);
    useEffect(() => {
        console.log("Current Page:", page);
        console.log("Page limit:", limit);
    }, [page, limit]);

    const handlePageSizeChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(0);
    };
    return (
        <div className="home">
            <header id="header">
                <div className="container-nav">
                    <div className="flex">
                        <a href="#"><i className="icone-principal">
                        </i></a>
        
                        <nav>
                            <ul>
                            <li><a href="#">HOME</a></li>
                            <li><a href="#catalogo">CATÁLOGO</a></li>
                            <li><a href="#sobre">SOBRE</a></li>
                            </ul>
                        </nav>
                        <div className="btn-login">
                            <a href="login"><button>LOGIN</button></a>
                        </div>
                    </div>
                </div>
            </header>
            <section className="section-home">
                <h1 className="Header">
                    Sua vida <span className="plusverde">+ verde</span>.
                </h1>
                <p className="paragrafo-home">O ArboCode é um e-commerce que visa otimizar o comércio de plantas de grande porte.<br />
                                            Somos responsáveis pelo transporte, avaliação do terreno e plantio.<br />
                                            Registre-se e busque a árvore perfeita para sua decoração.
                </p>
                <a href="login"><button className="button-header">Registrar-se</button></a>
            </section >
            <div className="containerh1">
                    <div className="indicadorVerde"></div>
                    <h1 className='header-title'>Catálogo</h1>
            </div>
                
            <div id='catalogo' className='container'>
                
                <div className='card-grid'>
                {data?.map((planta: PlantaData) => (
                <Card 
        
                    nomePlanta={planta.nomePlanta} 
                    descriçaoPlanta={planta.descriçaoPlanta}
                    porte={planta.porte}
                    imagem={planta.imagem} 
                    valor={planta.valor}/> ))}
                </div>
                {isModalOpen && <CreateModal/>}
            
             </div>
             <div className="containerh1">
                    <div className="indicadorVerde"></div>
                    <h1 className='header-title'>Sobre</h1>
            </div>
             <div id='sobre' className="container-sobre">
             <img className='foto-sobre' src="https://s2-g1.glbimg.com/jXG9TDkGHKydTiFfYqvtqFFL9J8=/0x0:1599x1066/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/0/j/PLv3ycSJmdb9PicuqwfQ/arvore-blumenau.jpeg" alt="" />
                <div>
                    <h4>O ArboCode é um projeto freelancer desenvolvido propriamente por mim, incluindo back-end, front-end e as ideias de operação e funcionamento da empresa. Todos os dados são lidos a partir de uma aplicação Spring e <br />persistidos em um banco de dados PostGresql.</h4>
                    <h3>Funcionamento</h3>
                    <p>A ideia foi criar um sistema que gerencie o funcionamento de um e-commerce de árvores decorativas de grande porte. A demanda deste mercado se dá quando há a necessidade de decoração a curto prazo, de forma que o plantio de uma "muda" se torne inviável para a situação. <br /> Desse modo, o ArboCode se responsabiliza: <br /></p>
                    <ul>
                        <li>
                            Pela logística de transporte da planta em tamanho médio ou adulta. <br />
                        </li>
                        <li>
                            Pela avaliação do ambiente em que a árvore será plantada, podendo aprovar ou não o plantio, <br />de acordo com fatores como tipo de solo, altura e largura requeridas pela árvore e acesso <br />à luz do sol. 
                        </li>
                        <li>
                            Pelo processo de implantação da árvore.
                        </li>
                    </ul>
                    <p>Além disso, os valores cada árvore apresentados no site já incluem todos os processos descrevidos acima.</p>
                    <h3>
                        Interfaces
                    </h3>
                    <p>O sistema conta com as seguintes interfaces: interface para o cliente final, acessado atráves do seu login ; a interface de administrador, responsável pelo controle da empresa e geração de relatórios; e a interface do funcionário, manuseada durante <br />o processo de implantação da árvore no local requerido, para finalizar e aprovar ou reprovar uma solicitação de plantio.</p>
                </div>
            
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
    )
}
    

export default HomePage

