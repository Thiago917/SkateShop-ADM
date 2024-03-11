import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'
import './style_login.css'

const Login = () => {

const [value, setValue] = useState()

  const handleGetValues = (values) =>{
    setValue((prevValue)=>({
      ...prevValue,
      [values.target.name]: values.target.value,
    }))
  }

  const handleClickLogin = () =>{
    Axios.post('http://localhost:5170/login', {
      email: value.email,
      senha: value.senha,
    }).then((response) => {
      console.log(response.data)
      if(response.data === 'Login efetuado com sucesso!'){
        Swal.fire({
          title: "Login efetuado com sucesso!",
          text: "Você será redirecionado para a página desejada em instantes...",
          background: '#262729',
          color: '#f1f1f1',
          icon: "success"
        });
        setTimeout(()=>{window.location='/store'}, 1000);
      }
      else[
        alert(response.data)
      ]
    })
  }

  const [ eye, setEye ] = useState('password')
  const changeEyeIcon = () =>{
    {eye === 'password' ? setEye('text') : setEye('password')}
  }

  return (
  <div className="login-section">
      <div className="login-form">
      <div className="form__group field">
        <input type="email" className="form__field" name='email' placeholder="Name" required="" onChange={handleGetValues} />
        <label htmlFor="email" className="form__label">EMAIL</label>
      </div>

      <div className="form__group field">
        <input type={eye} className="form__field" name='senha' placeholder="Name" required="" onChange={handleGetValues}  />
        {eye === 'password' ? (
        <FaEye className='eye-icon' onClick={changeEyeIcon} />
        ):(
        <FaEyeSlash className='eye-icon' onClick={changeEyeIcon} />
        )} 
        <label htmlFor="senha" className="form__label">SENHA</label>
      </div>

          <Link className='login-option login-option-forget' onClick={() => alert('Infelizmente terá que fazer outro cadastro!')}>Esqueci minha senha</Link>
          <div className="button">
            <button type='submit' onClick={handleClickLogin} className='login-btn'>ENTRAR</button>
          </div>
          <p className='login-option'>Não tem uma conta? <Link to='/cadastro' className='login-option login-option-link'>Registre-se</Link></p>
      </div>
  </div>
  )
}


export default Login