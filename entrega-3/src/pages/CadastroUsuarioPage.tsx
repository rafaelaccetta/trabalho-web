import React from 'react'
import CadastroUsuarioForm from '../components/CadastroUsuarioForm'

const CadastroUsuarioPage = () => {
  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Usuário</h5>
        <hr className="mt-1" />
      </div>

      <CadastroUsuarioForm />
    </>
  )
}

export default CadastroUsuarioPage