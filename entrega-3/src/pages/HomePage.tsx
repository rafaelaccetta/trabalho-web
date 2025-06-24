import React from "react";

export default function HomePage() {
  return (
    <div className="py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Bem-vindo à Livraria</h1>
        <p className="lead">Descubra os melhores livros para todas as idades e gostos.</p>
        <a href="/livros" className="btn btn-primary btn-lg mt-3">Ver Livros</a>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <img src="/StackedBooks.jpeg" className="card-img-top" alt="Livros em destaque" />
            <div className="card-body">
              <h5 className="card-title">Destaque da Semana</h5>
              <p className="card-text">Confira nossa seleção especial de livros recomendados!</p>
              <a href="/livros" className="btn btn-outline-primary">Saiba mais</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}