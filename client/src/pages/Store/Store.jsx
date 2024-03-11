//libs
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaPen } from 'react-icons/fa'
import { BiInfoCircle } from "react-icons/bi";
import Axios from 'axios'
import { GrClose } from 'react-icons/gr'
import Swal from 'sweetalert2'

//components
import RegisterProduct from '../../components/Cadastrar produto/Modal'
import Navbar from '../../components/Navbar/Navbar'

//estilos
import './style_store.css'



export const Store = () => {
  
  const carousel = useRef()
  
  const [ produto, setProduto ] = useState()
  
  const [ isOpen, setIsOpen ] = useState(false)

  const [ getImage, setGetImage ] = useState()

  const [ produtctId, setProductId ] = useState()
  
  const [ step, setStep ] = useState('produto-info')

  const [ images, setImages ] = useState([])


    const leftClick = (e) =>{
      e.preventDefault()
      carousel.current.scrollLeft -= 2000
    }

    const rightClick = (e) =>{
      e.preventDefault()
      carousel.current.scrollLeft += 2000
      
    }

    useEffect(() => {
      Axios.get('http://localhost:5170/getProduct').then((response) => {
        setProduto(response.data)
      })
    })
    
    return (
    <>
      <Navbar />
        <RegisterProduct isOpen={isOpen} setIsOpen={setIsOpen} step={step} setStep={setStep} id={produtctId} produto={produto} resgateImagem={setGetImage} setImages={setImages}/>
      <button className='product-register-button' onClick={() => setIsOpen(!isOpen)} >CADASTRAR PRODUTO</button>
      <div className="loja-container">
          <h1 className='store-title'>PRODUTOS</h1>
          <div className="arrows-carousel">
            <FaAngleDoubleLeft className='arrow' onClick={leftClick}/>
            <FaAngleDoubleRight className='arrow' onClick={rightClick}/>
          </div>
      <div className="carousel-container" ref={carousel}>

        {produto?.map((item) => {
        return (
            <>
          <div className="carousel" key={item.idproduto} >
            <div className="product-container"  key={item.idproduto}>
              <div className="product-image"  key={item.idproduto}>
                <img src={item.data} alt="" className='product-image' onClick={() => window.location=`/produto/${item.idproduto}`}/>
              <div className="functional-icons">

                <GrClose className='delete-product-icon' onClick={() => {
                  const swalWithBootstrapButtons = Swal.mixin({
                      customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger"
                      },
                      buttonsStyling: true
                    });
                    swalWithBootstrapButtons.fire({
                      title: "Tem certeza?",
                      text: "Não será possível reverter a ação",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Sim, quero deletar",
                      cancelButtonText: "Cancelar",
                      reverseButtons: true,
                      background: '#262729',
                      color: '#f1f1f1'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Axios.delete(`http://localhost:5170/deleteProduct/${item.idproduto}`).then((response) => {
                          //
                        })
                        swalWithBootstrapButtons.fire({
                          title: "Deletado!",
                          text: "Produto deletado com sucesso",
                          icon: "success",        
                          background: '#262729',
                          color: '#f1f1f1'
                        });
                      } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        swalWithBootstrapButtons.fire({
                          title: "Cancelado",
                          text: "Sua ação foi cancelada",
                          icon: "error",
                          background: '#262729',
                          color: '#f1f1f1'
                        });
                      }
                    });
                
                }}/>
                <FaPen className='edit-product-icon' onClick={() => {
                  setIsOpen(true)
                  setStep('produto-info-edit-version')
                  setProductId(item.idproduto)
                }}/>
                <BiInfoCircle className='info-product-icon' onClick={() => {
                  setIsOpen(true)
                  setStep('produto-data')
                  setProductId(item.idproduto)
                }}/>

              </div>
              </div>
              <p className='product-name product-content' onClick={() => console.log(item.idproduto)}>{item.nome}</p>
              <p className='product-price product-content'>R${item.preco}</p>
              <button className='add-to-car-button' onClick={() => window.location=`/carrinho/${item.idproduto}`}>ADICIONAR AO CARRINHO</button>
            </div>
          </div>
            </>
          ) 
        })}
      </div>
      </div>
  </>
  )
}
