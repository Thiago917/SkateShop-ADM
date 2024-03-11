import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card do Funcionario/Card'
import Axios from 'axios'


import './style_funcionario.css'

export const Funcionario = () => {

  const carousel = useRef()
  const [ funcionario, setFuncionario ] = useState()

  useEffect(() => {
    Axios.get('http://localhost:5170/getFuncionario').then((response) => {
      setFuncionario(response.data)
    })
  })

  const leftClick = (e) =>{
    e.preventDefault()
    carousel.current.scrollLeft -= 2000
  }

  const rightClick = (e) =>{
    e.preventDefault()
    carousel.current.scrollLeft += 2000
  }

  return (
    <>
      <Navbar />
      
      <FaAngleDoubleLeft className='arrow' onClick={leftClick}/>
      <FaAngleDoubleRight className='arrow' onClick={rightClick}/>
      <div className="funcionario-page-section">
        <div className="funcionario-page-container" ref={carousel}>
          {funcionario && funcionario.map((item, index) => {
            return(
              <>
              <Card nome={item.nome} sobrenome={item.sobrenome} cargo={item.cargo} email={item.email} id={item.idFunc} senha={item.senha} index={index} funcData={funcionario} key={index}/>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}
