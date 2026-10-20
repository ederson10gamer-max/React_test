import React, { useState } from 'react';
import './App.css'; // Importa os estilos que criaremos a seguir

export default function App() {
  // --- ESTADOS (HOOKS) ---
  // Controle do Menu Lateral (false = fechado, true = aberto)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Controle do Carrossel (guarda o índice da imagem atual)
  const [carouselIndex, setCarouselIndex] = useState(0);

  // --- DADOS FALSOS (MOCK DATA) ---
  const produtos = [
    { id: 1, nome: "Tênis Ultra Esportivo", preco: "R\$ 299,90", img: "https://unsplash.com" },
    { id: 2, nome: "Relógio Inteligente Smart", preco: "R\$ 450,00", img: "https://unsplash.com" },
    { id: 3, nome: "Mochila Impermeável Tech", preco: "R\$ 189,90", img: "https://unsplash.com" }
  ];

  // --- FUNÇÕES DE NAVEGAÇÃO DO CARROSSEL ---
  const proximaImagem = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % produtos.length);
  };

  const imagemAnterior = () => {
    setCarouselIndex((prevIndex) => (prevIndex === 0 ? produtos.length - 1 : prevIndex - 1));
  };

  return (
    <div className="layout-container">
      
      {/* 1. BARRA DE NAVEGAÇÃO (NAVBAR) */}
      <nav className="navbar">
        <div className="nav-logo">DevStore</div>
        
        {/* ÁREA SENSÍVEL AO HOVER: Ao passar o mouse aqui, abre o menu lateral */}
        <div 
          className="nav-menu-trigger"
          onMouseEnter={() => setIsSidebarOpen(true)}
        >
          ☰ Menu Expansível
        </div>
      </nav>

      {/* 2. MENU LATERAL (SIDEBAR) */}
      {/* Usamos JavaScript dinâmico para adicionar a classe 'open' se o estado for true */}
      <div 
        className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
        onMouseLeave={() => setIsSidebarOpen(false)} // Fecha se o mouse sair completamente da barra
      >
        <div className="sidebar-header">
          <h3>Navegação</h3>
          {/* Botão X para fechar o menu ao clicar */}
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
        </div>
        <ul className="sidebar-links">
          <li><a href="#home">Início</a></li>
          <li><a href="#produtos">Produtos</a></li>
          <li><a href="#sobre">Sobre Nós</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </div>

      {/* 3. CONTEÚDO PRINCIPAL (LANDING PAGE) */}
      <main className="main-content">
        <header className="hero-section">
          <h1>Bem-vindo à Loja do Futuro</h1>
          <p>Explore nossos produtos premium com as melhores ofertas do mercado.</p>
        </header>

        {/* SECTION DO CARROSSEL DE PRODUTOS */}
        <section id="produtos" className="carousel-section">
          <h2>Destaques da Semana</h2>
          
          <div className="carousel-container">
            {/* Botão Esquerdo */}
            <button className="carousel-arrow left" onClick={imagemAnterior}>‹</button>
            
            {/* Card do Produto Atual do Carrossel */}
            <div className="product-card">
              <div className="badge-hover">Novidade!</div>
              <img 
                src={produtos[carouselIndex].img} 
                alt={produtos[carouselIndex].nome} 
                className="product-image"
              />
              <div className="product-info">
                <h3>{produtos[carouselIndex].nome}</h3>
                <p className="price">{produtos[carouselIndex].preco}</p>
                <button className="buy-btn">Comprar Agora</button>
              </div>
            </div>

            {/* Botão Direito */}
            <button className="carousel-arrow right" onClick={proximaImagem}>›</button>
          </div>
          
          {/* Indicadores de bolinha abaixo do carrossel */}
          <div className="carousel-dots">
            {produtos.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === carouselIndex ? 'active' : ''}`}
                onClick={() => setCarouselIndex(index)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
