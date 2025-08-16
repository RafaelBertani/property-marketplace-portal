import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                
                <div className="footer-section links">
                <h6>Links Úteis</h6>
                <ul>
                    <li><a href="/sobre">Sobre</a></li>
                    <li><a href="/servicos">Serviços</a></li>
                    <li><a href="/msv">Missão, visão e valores</a></li>
                </ul>
                </div>

                <div className="footer-section contact">
                <h5>Contato</h5>
                <p>Email: contato@empresa.com</p>
                <p>Telefone: (11) 1234-5678</p>
                <p>Endereço: Rua Exemplo, 123 - São Paulo, SP</p>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Empresa [Nome]. Todos os direitos reservados.
            </div>
            </footer>
    );
};

export default Footer;
