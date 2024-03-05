//libs
import React, {useState} from 'react'
import { GrClose } from "react-icons/gr";
import { SlArrowLeftCircle } from "react-icons/sl";
import Axios from 'axios'
import Swal from 'sweetalert2';

//firebase
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'

//estilização
import './style_modal.css'

const RegisterProduct = ({isOpen, setIsOpen, setImageProduct, setGetImage, step, setStep, id}) => {
  

  const [ value, setValue] = useState()

  const [ imgURL, setImgURL ] = useState('')


  const handleGetValues = (values) =>{
    setValue((prevValue) => ({
      ...prevValue,
      [values.target.name] : [values.target.value]
    }))
  }

  const handleUpload = async (event) => {
    event.preventDefault()
    const file = event.target[0]?.files[0]
    
    if(!file){ return }

    if(!file) return

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)


    await getDownloadURL(uploadTask.snapshot.ref).then(url => {
      setImgURL(url)
    })
    
  }
  
  const handleRegisterProduct = () => {
    Axios.post('http://localhost:5174/postProduct', {
      nome: value.nome,
      preco: value.preco,
      categoria: value.categoria,
      quantidade: value.quantidade,
    }).then((response) =>{
      setIsOpen(!isOpen)
      setStep('produto-info')
      console.log(response)
      if(response.data === 'Produto cadastrado com êxito!'){
        alert(response.data)
      } 
      else{
        alert(response.data)
      }
    })
    setImageProduct(imgURL)
  }

  const changeStep = () => {  
    setStep('produto-image')
  }
  
  const handleEditProduct = () =>{
    Axios.put('http://localhost:5174/editProduct', {
      id: id,
      nome: value.nome,
      preco: value.preco,
      categoria: value.categoria,
      quantidade: value.quantidade,
    }).then((response) => {
      if(response.data === 'true'){
        Swal.fire({
          title: "Sucesso!",
          text: "Dados do produto alterados com sucesso",
          background: '#262729',
          color: '#f1f1f1',
          icon: "success"
        });
        setIsOpen(false)
        setStep('produto-info')
      }
    })

  }
  if(isOpen){ 
  return (
    <>

    <div className="modal-section">
      <div className="modal-container">
        <h1 className='modal-title'>Registre seu produto</h1>
        <div className='close-modal-button' onClick={() => setIsOpen(false)}>
        <GrClose className='close-modal-icon'/>
        </div>
    
        {step === 'produto-info' && (
          <>
            <input type="text" placeholder='Nome do produto' name='nome' className='input-modal' onChange={handleGetValues}/>
            <input type="text" placeholder='Preço do produto (00,00)' name='preco' className='input-modal' onChange={handleGetValues}/>
            <input type="text" placeholder='Categoria do produto' name='categoria' className='input-modal' onChange={handleGetValues}/>
            <input type="text" placeholder='Quantidade a ser cadastrada' name='quantidade' className='input-modal' onChange={handleGetValues}/>
            <button className='modal-button' onClick={changeStep}>AVANÇAR</button>
          </>
        )}

        {step === 'produto-image' && (
          <>
            <form action="" onSubmit={handleUpload} className='upload-image-container'>
                <SlArrowLeftCircle className='go-back-page' onClick={() => setStep('produto-info')}/>
                <div className="modal-product-image">
                  <label htmlFor="produto" className='product-image-label'>Foto do produto</label>
                  <input type="file" onChange={handleUpload} name='produto' />
                </div>
                <button type='submit' className="modal-button-register modal-button" onClick={handleRegisterProduct}>REGISTRAR</button>
            </form>
          </>
        )}

        {step === 'produto-info-edit-version' && (
            <>
              <input type="text" placeholder='Nome do produto' name='nome' className='input-modal' onChange={handleGetValues} />
             <input type="text" placeholder='Preço do produto (00,00)' name='preco' className='input-modal' onChange={handleGetValues} />
             <input type="text" placeholder='Categoria do produto' name='categoria' className='input-modal' onChange={handleGetValues}/>
             <input type="text" placeholder='Quantidade a ser cadastrada' name='quantidade' className='input-modal' onChange={handleGetValues}/>
             <button className='modal-button' onClick={handleEditProduct}>CONFIRMAR ALTERAÇÃO</button>
            </>
          )}
          </div>
    </div>
    
    </>
  )
}
}

export default RegisterProduct