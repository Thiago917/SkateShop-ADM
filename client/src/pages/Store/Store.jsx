//libs
import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaPen } from 'react-icons/fa'
import Axios from 'axios'
import { GrClose } from 'react-icons/gr'

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

  const [ imageProduct, setImageProduct] = useState()

    const leftClick = (e) =>{
      e.preventDefault()
      carousel.current.scrollLeft -= 2000
    }

    const rightClick = (e) =>{
      e.preventDefault()
      carousel.current.scrollLeft += 2000
      
    }

    useEffect(() => {
      Axios.get('http://localhost:5174/getProduct').then((response) => {
        setProduto(response.data)
      })
    })
    console.log(imageProduct)
    
    const handleDeleteProduct = () =>{
      produto.map((item) => Axios.delete(`http://localhost:5174/deleteProduct/${item.idproduto}`).then((response) => {
        alert(response.data)
      }))
    }

    const [ step, setStep ] = useState('produto-info')

    const handleOpenEditMode = () => {
      setStep('produto-info-edit-version')
      setIsOpen(true)
    }

  return (
    <>
    <Navbar />
    <RegisterProduct isOpen={isOpen} setIsOpen={setIsOpen} setImageProduct={setImageProduct} setGetImage={setGetImage} step={step} setStep={setStep}/>
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
            <div className="product-container">
              <div className="product-image">
              <img src={imageProduct} alt="" className='product-image' onClick={() => window.location=`/produto/${item.idproduto}`}/>~
              <div className="functional-icons">
                <GrClose className='delete-product-icon' onClick={handleDeleteProduct}/>
                <FaPen className='edit-product-icon' onClick={handleOpenEditMode}/>
              </div>
              </div>
              <p className='product-name product-content'>{item.nome}</p>
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
