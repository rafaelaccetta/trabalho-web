const LivroPage = () => {
  return (
    <>
    
           <section className="py-5 bg-light">

            <div className="row justify-content-center" style={{marginLeft: "auto"}} >
                <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                        <img src="https://picsum.photos/400/400?random=1" style={{objectFit: "fill"}} alt="Imagem do Produto" className="card-img-top"/>
                        <div className="card-body">
                          <h5><span className="badge rounded-pill text-bg-info">Lançamento!</span></h5>  
                          <h2 className="card-title">Título do livro </h2>
                            <h4 className="card-text">Autor</h4>
                            <br/>
                            <h5 className="card-text">R$99,99</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mb-4 shadow-sms" >
                        <div className="accordion" id="accordionExample" style={{width: "800px"}}>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                  Sinopse
                                </button>
                              </h2>
                              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat nostrum repellat in suscipit earum nobis similique magnam facilis, id autem dicta alias quia tempore enim voluptas iure libero explicabo nemo?  
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                  Características
                                </button>
                              </h2>
                              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <p>Autor: XXXXXX</p>
                                  <p>Editora: XXXXXX</p>
                                  <p>Idioma: XXXXXX</p>
                                  <p>Número de Páginas: XXXXXX</p>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                  Disponibilidade
                                </button>
                              </h2>
                              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                  <div className="alert alert-danger" role="alert">
                                    Livro esgotado!
                                  </div>                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          
                    </div>
                    <span className="d-inline-block" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Livro esgotado :(">
                      <button className="btn btn-primary" type="button" disabled>Adicionar ao carrinho</button>
                    </span>

                </div>
            </div>
        </section>
    
    </>
  )
}

export default LivroPage