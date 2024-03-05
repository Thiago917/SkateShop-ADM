//Dependências
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

//Estilização
import './style_carrinho.css'

const Produto = () => {

    const {id} = useParams()
    
    const [ produto, setProduto ] = useState()
    
    useEffect(() =>{
        Axios.get(`http://localhost:5174/carrinho/${id}`).then((response) => {
            setProduto(response.data)
            console.log(response)
        })
    })

  return (
    <>
        <Navbar />
        <div className="carrinho-section">
            <div className="carrinho-container">
                {produto?.map((item) =>{
                    return (
                        <div className="carrinho-content" key={item.idproduto}>
                            <div className="carrinho-imagem">
                                <img src=''/>
                            </div>
                        <p className='carrinho-info'>{item.nome}</p>
                        <p className='carrinho-info'>{item.preco}</p>
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