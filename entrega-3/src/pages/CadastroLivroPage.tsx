import React from 'react'
import LivroForm from '../components/LivroForm'

const CadastroLivroPage = () => {
  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Livros</h5>
        <hr className="mt-1" />
      </div>

      <LivroForm />
    </>
  )
}

export default CadastroLivroPage