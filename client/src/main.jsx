//dependências
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

//páginas
import Login from './pages/Login/Login.jsx'
import Cadastro from './pages/Cadastro/Cadastro.jsx'
import {Store} from './pages/Store/Store.jsx'
import Carrinho from './pages/Carrinho/Carrinho.jsx'
import { Produto } from './pages/Produto/Produto.jsx'
import { Funcionario } from './pages/Funcionario/Funcionario.jsx'

//estilização
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/cadastro' element={<Cadastro />}/>
        <Route path='/store' element={<Store />}/>
        <Route path='/funcionario' element={<Funcionario />}/>
        <Route path='/carrinho/:id' element={<Carrinho />}/>
        <Route path='/produto/:id' element={<Produto />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
