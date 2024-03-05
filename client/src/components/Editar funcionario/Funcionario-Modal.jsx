//libs
import React, {useState} from 'react'
import { GrClose } from "react-icons/gr";
import Axios from 'axios'

//estilização
import './style_editFuncionario.css'

const EditFuncionario = ({isOpen, setIsOpen}) => {

    const [ value, setValue ] = useState()

    const handleGetFuncData = (values) => {
        setValue((prevValue) =>({
            ...prevValue,
            [values.target.name] : [values.target.value]
        }))
    }

    const handleEditFunc = () => {
        Axios.put('http://localhost:5174/editFuncData', {
            nome: value.nome,
            sobrenome: value.sobrenome,
            email: value.email,
            cargo: value.cargo,

        }).then((response) => {
            setIsOpen(false)
            if(response.data === 'Dados do funcionário atualizados com sucesso!'){
                Swal.fire({
                    title: "Sucesso",
                    text: "Dados do funcionário alterados com sucesso",
                    background: '#262729',
                    color: '#f1f1f1',
                    icon: "success"
                  });
            }
        })
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
            <input type="text" placeholder='Nome' className='input-modal' name='nome' onChange={handleGetFuncData} defaultValue={value.nome}/>
            <input type="text" placeholder='Sobrenome' className='input-modal' name='sobrenome' onChange={handleGetFuncData} defaultValue={value.sobrenome}/>
            <input type="email" placeholder='Email' className='input-modal' name='email' onChange={handleGetFuncData} defaultValue={value.email}/>
            <input type="text" placeholder='Cargo' className='input-modal' name='cargo' onChange={handleGetFuncData} defaultValue={value.cargo}/>
            <button className='modal-button' onClick={handleEditFunc}> EDITAR DADOS</button>
        </div>
    </div>
    
    </>
  )
}
}

export default EditFuncionario