import React, { useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import EditFuncionario from '../Editar funcionario/Funcionario-Modal';
import Swal from 'sweetalert2'
import Axios from 'axios';

import './Card.css'

const Card = ({nome, sobrenome, cargo, email, senha, id, index}) => {

  const [ isOpen, setIsOpen ] = useState()

  const [ funcId, setFuncId ] = useState()

  const deleteFuncionario = () => {
    Axios.delete(`http://localhost:5174/deleteFuncionario/${id}`).then((response) => {
      console.log(response)
    })
  }
  return (
    <>
        <div className="funcionario-container" key={index}>
         <div className="crud-edit-funcionario">
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
                   deleteFuncionario()
                  
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
            setFuncId(id)
          }}/>
          <EditFuncionario isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
          <div className="funcionario-content">
              <h2 className='funcionario-nome funcionario-info'>{nome} {sobrenome}</h2>
              <p className='funcionario-label'>EMAIL: 
                <p className='funcionario-data'>{email}</p>
              </p>
              <p className='funcionario-label'>CARGO: 
                <p className='funcionario-data'>{cargo}</p>
              </p>
              <p className='funcionario-label'>NÚMERO DE IDENTIFICAÇÃO: 
                <p className='funcionario-data'>{id}</p>
              </p>
          </div>
        </div>
    </>
  )
}

export default Card