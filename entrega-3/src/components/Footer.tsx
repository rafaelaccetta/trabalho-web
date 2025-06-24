import React from 'react'

const Footer = () => {
  return (
    <footer className="footer bg-light py-3 mt-5 border-top w-100">
      <div className="d-flex justify-content-between align-items-center px-4" style={{maxWidth: "1280px", margin: "0 auto"}}>
        <span className="text-muted">&copy; 2025 Livraria</span>
        <a href="#" className="text-decoration-none">Voltar para o topo</a>
      </div>
    </footer>
  )
}

export default Footer