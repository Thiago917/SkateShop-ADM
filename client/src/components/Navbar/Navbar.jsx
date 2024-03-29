import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import './style_navbar.css'

export const Navbar = () => {
  return (
    <>
    <nav className='navbar'>
        <Link to='/store'><p className='li'>LOJA</p></Link>
        <img src={logo} alt="" className='logo-navbar' />
        <p className="li" onClick={() => window.location='/funcionario'}>FUNCIONÁRIOS</p>
    </nav>
        <button>
        <Link to='/'><span className="box"> SAIR </span></Link>
        </button>
    </>
  )
}

export default Navbar