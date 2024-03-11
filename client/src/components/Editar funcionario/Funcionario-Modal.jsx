//libs
import React, {useState} from 'react'
import { GrClose } from "react-icons/gr";
import Axios from 'axios'
import Swal from 'sweetalert2';

//estilização
import './style_editFuncionario.css'

const EditFuncionario = ({isOpen, setIsOpen, funcData, id}) => {

    const [ value, setValue ] = useState()

    const handleGetFuncData = (values) => {
        setValue((prevValue) =>({
            ...prevValue,
            [values.target.name] : [values.target.value]
        }))
    }

    const handleEditFunc = () => {
        Axios.put('http://localhost:5170/editFuncData', {
            id: id,
            nome: value.nome,
            sobrenome: value.sobrenome,
            email: value.email,
            cargo: value.cargo
        }).then((response) => {
            if(response.data === true) {
                Swal.fire({
                title: "Sucesso",
                text: 'Dados do funcionário alterados com sucesso!',
                background: '#262729',
                color: '#f1f1f1',
                icon: "success"
            });
        }
            else{
                Swal.fire({
                    title: "Eita...",
                    text: 'Algo não ocorreu como deveria',
                    background: '#262729',
                    color: '#f1f1f1',
                    icon: "error"
                });
        }
        })
        setIsOpen(false)
    }

  if(isOpen){ 
  return (
    <>

    <div className="edit-funcionario-modal">
        <div className="edit-funcionario-form">
            <GrClose className='close-editFuncionario-modal-button' onClick={() => {
                setIsOpen(false)
            }}/>
                    <h1 className='modal-title'>Editar dados do funcionário</h1>
                    <input type="text" placeholder='Nome' className='input-modal' name='nome' onChange={handleGetFuncData} />
                    <input type="text" placeholder='Sobrenome' className='input-modal' name='sobrenome' onChange={handleGetFuncData} />
                    <input type="email" placeholder='Email' className='input-modal' name='email' onChange={handleGetFuncData} />
                    <input type="text" placeholder='Cargo' className='input-modal' name='cargo' onChange={handleGetFuncData} />
                    <button className='modal-button' onClick={handleEditFunc}> EDITAR DADOS</button>
        </div>
    </div>
    
    </>
  )
}
}

export default EditFuncionario