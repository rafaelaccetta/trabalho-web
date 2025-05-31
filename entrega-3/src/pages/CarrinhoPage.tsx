const CarrinhoPage = () => {
  return (
    <div className="container mt-4" style={{ marginTop: "720px" }} >
            <section className="py-5 bg-light">
                <h1 className="mb-4">Seu Carrinho</h1>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Descrição</th>
                        <th scope="col" className="text-center">Preço</th>
                        <th scope="col" className="text-center">Quantidade</th>
                        <th scope="col" className="text-center">Subtotal</th>
                        <th scope="col" className="text-center">Ações</th>
                        </tr>
                    </thead>
                
                    <tbody>
                        <tr>
                        <td style={{ width: "100px"}} >
                            <img src="assets/images/product1.jpeg" alt="Produto 1" className="img-fluid img-thumbnail"/>
                        </td>
                        <td>
                            <strong>Produto 1</strong><br/>
                            Breve descrição do produto.
                        </td>
                        <td className="text-center">R$ 100,00</td>
                        <td className="text-center">
                            <input type="number" value="1" min="1" className="form-control text-center" style={{maxWidth: "80px"}} />
                        </td>
                        <td className="text-center">R$ 100,00</td>
                        <td className="text-center">
                            <button className="btn btn-danger btn-sm">Remover</button>
                        </td>
                        </tr>
                
                        <tr>
                        <td style={{ width: "100px" }} >
                            <img src="assets/images/product2.jpeg" alt="Produto 2" className="img-fluid img-thumbnail" />
                        </td>
                        <td>
                            <strong>Produto 2</strong><br/>
                            Descrição breve do produto.
                        </td>
                        <td className="text-center">R$ 150,00</td>
                        <td className="text-center">
                            <input type="number" value="2" min="1" className="form-control text-center" style={{ maxWidth: "80px"}}/>
                        </td>
                        <td className="text-center">R$ 300,00</td>
                        <td className="text-center">
                            <button className="btn btn-danger btn-sm">Remover</button>
                        </td>
                        </tr>
                
                        <tr>
                            <td style={{ width: "100px" }}>
                            <img src="assets/images/product3.jpeg" alt="Produto 3" className="img-fluid img-thumbnail"/>
                            </td>
                            <td>
                            <strong>Produto 3</strong><br/>
                            Descrição breve do produto.
                            </td>
                            <td className="text-center">R$ 200,00</td>
                            <td className="text-center">
                            <input type="number" value="3" min="1" className="form-control text-center" style={{ maxWidth: "80px" }}/>
                            </td>
                            <td className="text-center">R$ 600,00</td>
                            <td className="text-center">
                            <button className="btn btn-danger btn-sm">Remover</button>
                            </td>
                        </tr>
                    </tbody>
                
                    </table>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <a href="./catalogo.html" className="btn btn-secondary">Continuar Comprando</a>
                    </div>
                
                    <div className="col-md-6 text-right">
                        <h4>Total: R$ 1000,00</h4>                                             
                        <button className="btn btn-primary btn-lg">Finalizar Compra</button>
                    </div>
                </div>
            </section>
        </div>
  )
}

export default CarrinhoPage