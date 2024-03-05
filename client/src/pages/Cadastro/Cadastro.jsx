import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Axios from 'axios';
import Swal from 'sweetalert2';

import './style_cadastro.css'

const Cadastro = () => {

  const [ value, setValue ] = useState()
  
  const handleGetValues = (value) =>{
    setValue((prevValue)=>({
      ...prevValue,
      [value.target.name] : value.target.value,
    }))
  }

  const handleCadastroADM = () => {
    
    if(value.confirmar !== value.senha){
        alert('As senhas são diferentes')
    }
    else{
    Axios.post('http://localhost:5174/register', {
      nome: value.nome,
      sobrenome: value.sobrenome,
      cargo:   value.cargo,
      email: value.email,
      senha: value.senha,
    }).then((response) => {
      console.log(response)
     
          if(response.data.msg === 'Cadastrado com sucesso!'){
            Swal.fire({
              title: "Parabéns, cadastrado com sucesso",
              text: "Você será redirecionado para a página de login em instantes...",
              background: '#262729',
              color: '#f1f1f1',
              icon: "success"
            });
            setTimeout(()=>{window.location='/'}, 3000);
          }
          else{
            alert(response.data.msg)
          }
      })
    }

  }

  const [ firstEye, setFirstEye ] = useState('password')
  const changeFirstEye = () =>{
    firstEye === 'password' ? setFirstEye('text') : setFirstEye('password')
  }

  const [ secondEye, setSecondEye ] = useState('password')
  const changeSecondEye = () =>{
    secondEye === 'password' ? setSecondEye('text') : setSecondEye('password')
  }

  return (
    <div className="cadastro-section">
      <div className="cadastro-form">
        <div className="nomes">
          <div className="form__group field">
            <input  name='nome' type="input" className="form__field" placeholder="Name" required="" onChange={handleGetValues}  />
            <label htmlFor="name" className="form__label">NOME</label>
          </div>
          <div className="form__group field">
            <input  name='sobrenome' type="input" className="form__field" placeholder="Name" required="" onChange={handleGetValues}   />
            <label htmlFor="name" className="form__label">SOBRENOME</label>
          </div>
        </div>
      <div className="form__group field">
        <input  name='cargo' type="input" className="form__field" placeholder="Name" required="" onChange={handleGetValues}   />
        <label htmlFor="cargo" className="form__label">CARGO</label>
      </div>
      <div className="form__group field">
        <input  name='email' type="input" className="form__field" placeholder="Name" required="" onChange={handleGetValues}   />
        <label htmlFor="name" className="form__label">EMAIL</label>
      </div>
      <div className="form__group field">
        <input  name='senha' type={firstEye} className="form__field" placeholder="Name" required="" onChange={handleGetValues}   />
        {firstEye === 'password' ? (
          <FaEye className='eye-icon eye-icon-1' onClick={changeFirstEye}/>
        ): (
          <FaEyeSlash className='eye-icon eye-icon-1' onClick={changeFirstEye} />
        )}
        <label htmlFor="name" className="form__label">SENHA</label>
      </div>
      <div className="form__group field">
        <input  name='confirmar' type={secondEye} className="form__field" placeholder="Name" required="" onChange={handleGetValues}   />
        {secondEye === 'password' ? (

          <FaEye className='eye-icon eye-icon-2'  onClick={changeSecondEye}/>
        ): (
          <FaEyeSlash className='eye-icon eye-icon-2'  onClick={changeSecondEye} /> 
        )}
        <label htmlFor="name" className="form__label">CONFIRMAR SENHA</label>
      </div>

        <button className="cadastro-btn" onClick={handleCadastroADM}>REGISTRAR</button>
        <p className='cadastro-option'>Já tem uma conta? <Link className='cadastro-option-link' onClick={() => window.location='/'}>Entrar</Link></p>
      </div>
    </div>
  )
}

export default Cadastro