//Dependências
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

//Estilização
import './style_carrinho.css'

const Produto = () => {
    
    const [ produto, setProduto ] = useState()
    
    useEffect(() =>{
        Axios.get('http://localhost:5174/getProduct').then((response) => {
            setProduto(response.data)
        })
    }, [])

  return (
    <>
        <Navbar />
        <div className="carrinho-section">
            <div className="carrinho-container">
                {produto?.map((item) =>{
                    return (
                        <div className="carrinho-content" key={item.idproduto}>
                            <div className="carrinho-imagem">
                                <img src={item.imagem} alt={item.nome} />
                            </div>
                        <p className='carrinho-info'>{item.nome}</p>
                        </div>
                    )
                })}
            </div>

            <div className="info-carrinho-container">

            </div>
        </div>
    </>
  )
}

export default Produto