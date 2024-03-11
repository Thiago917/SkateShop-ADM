import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

import './style_produto.css'

export const Produto = () => {
    const {id} = useParams()

    const [produto, setProdutos ] = useState()

    useEffect(() => {
        Axios.get('http://localhost:5170/getProduct').then((response) => {
            setProdutos(response.data)
            console.log(response.data)
        })
    }, [])

    return (
        <div className="produto-section">
            {produto?.map((item) => {
                if(String(item.idproduto) === id){
                    return(
                        <>
                        <div className="produto-container">
                            <div className="produto-content">
                                <p className="produto-desc nome">{item.nome}</p>
                                <img src={item.imagem} alt="" className="produto-imagem" />
                            </div>
                        </div>

                        <div className="produto info">
                            <p className='produto-preco'>R${item.preco}</p>
                            <p className='produto-subpreco'>ou até em 10x no cartão</p>

                            <button></button>
                            <button></button>
                            <button></button>
                            <button></button>
                            <button></button>
                        <div className="produto-description">

                        </div>
                        <div className="continue-buying">
                            <button>COMPRAR</button>
                        </div>
                        </div>
                        </>
                    )
                }
            })}
    </div>
  )
}
