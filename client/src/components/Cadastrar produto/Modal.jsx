//libs
import React, {useState, useEffect} from 'react'
import { GrClose } from "react-icons/gr";
import { SlArrowLeftCircle } from "react-icons/sl";
import Axios from 'axios'
import Swal from 'sweetalert2';

//firebase
import { db, storage } from '../../firebase'
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
  
//estilização
import './style_modal.css'

const RegisterProduct = ({isOpen, setIsOpen, step, setStep, id, setImages, produto}) => {
  

  const [ value, setValue] = useState()

  const userCollectionRef = collection(db, 'Skate-shop')

  const [ file, setFile ] = useState(null)

  const [ progress, setProgress ] = useState(null)

  const [data, setData ] = useState(null)

  const [ isSubmit, setIsSubmit ] = useState(false)

  const changeStep = () => {  
    setStep('produto-image')
  }
  
  //RESGATA VALORES DIGITADOS NOS INPUTS DO FORMULÁRIO
  const handleGetValues = (values) =>{
    setValue((prevValue) => ({
      ...prevValue,
      [values.target.name] : [values.target.value]
    }))
  }
  
  //CADASTRO DAS IMAGENS DO STORAGE DO FIREBASE
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', (snapshot) => {
        const progress =
        (snapshot.bytesTransferred  / snapshot.totalBytes) * 100
        setProgress(progress)
        switch (snapshot.state) {
          case 'paused' :
            alert('Algo não ocorreu como deveria')
            break
            
          case 'running' :
            Swal.fire({
              text: 'Fazendo upload da imagem...',
              width: 400,
            });
            Swal.showLoading()
            break;

          default:

            break;
        }
      }, (error) => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, imagem : `${downloadURL}`}))
        })
      }
      )
    }
    file && uploadFile()
  }, [file])

  // RESGATA DO FIRESTORE DATABASE AS IMAGENS QUE FORAM LÁ CADASTRADAS
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(userCollectionRef)
  //     setImages(data.docs.map((doc) => ({ ...doc.data(), id : doc.id})))
  //   }
  //   getUsers()
  // })

  //CADASTRA PRODUTOS NO BANCO DE DADOS
  const handleRegisterProduct = () => {
    Axios.post('http://localhost:5170/postProduct', {
      nome: value.nome,
      preco: value.preco,
      categoria: value.categoria,
      quantidade: value.quantidade,
      data: data.imagem,
    }).then((response) =>{
      setIsOpen(!isOpen)
      setStep('produto-info')
      console.log(response)
      if(response.data === true){
        Swal.fire({
          title: "Sucesso!",
          text: 'Produto adicionado com sucesso',
          background: '#262729',
          color: '#f1f1f1',
          icon: "success"
        });
      } 
      else{
        Swal.fire({
          title: "Erros",
          text: (response.data),
          background: '#262729',
          color: '#f1f1f1',
          icon: "error"
        });
      }
    })
  }

  //EDITA OS PRODUTOS QUE FORAM CADASTRADOS NO BANCO DE DADOS CONFORME SEU ID
  const handleEditProduct = () =>{
    Axios.put('http://localhost:5170/editProduct', {
      id: id,
      nome: value.nome,
      preco: value.preco,
      categoria: value.categoria,
      quantidade: value.quantidade,
    }).then((response) => {
      console.log(response.data)
      if(response.data == true){
        Swal.fire({
                title: "Sucesso!",
                text: "Dados do produto alterados com sucesso",
                background: '#262729',
                color: '#f1f1f1',
                icon: "success"
              });
      }
      else{
        Swal.fire({
          title: "Erro!",
          text: "Algo não ocorreu como deveria",
          background: '#262729',
          color: '#f1f1f1',
          icon: "error"
        });
      }
      setStep('produto-info')
      setIsOpen(false)
    })
  }

  if(isOpen){ 
  return (
    <>
    <div className="modal-section">
      <div className="modal-container">
        <div className='close-modal-button' onClick={() => {
          setIsOpen(false)
          setStep('produto-info')
          }}>
        <GrClose className='close-modal-icon'/>
        </div>
    
        {step === 'produto-info' && (
          <>
          <h1 className='modal-title'>Registre seu produto</h1>
          <input type="text" placeholder='Nome do produto' name='nome' className='input-modal' onChange={handleGetValues}/>
          <input type="text" placeholder='Preço do produto (00,00)' name='preco' className='input-modal' onChange={handleGetValues}/>
          <input type="text" placeholder='Categoria do produto' name='categoria' className='input-modal' onChange={handleGetValues}/>
          <input type="text" placeholder='Quantidade a ser cadastrada' name='quantidade' className='input-modal' onChange={handleGetValues}/>
          <button className='modal-button' onClick={changeStep}>AVANÇAR</button>
          </>
        )}

        {step === 'produto-image' && (
          <>
              <h1 className='modal-title'>ESCOLHA A IMAGEM DO PRODUTO</h1>
            <form action="" className='upload-image-container'>
                <SlArrowLeftCircle className='go-back-page' onClick={() => setStep('produto-info')}/>
                <div className="modal-product-image">
                  <label htmlFor="produto" className='product-image-label'>Foto do produto</label>
                  <input type="file"  onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <button type='submit' className="modal-button-register modal-button" onClick={handleRegisterProduct}>REGISTRAR</button>
            </form>
          </>
        )}

        {step === 'produto-info-edit-version' && (
            <>
            <h1 className='modal-title'>Editar informações</h1>
              <input type="text" placeholder='Nome do produto' name='nome' className='input-modal' onChange={handleGetValues} />
              <input type="text" placeholder='Preço do produto (00,00)' name='preco' className='input-modal' onChange={handleGetValues} />
              <input type="text" placeholder='Categoria do produto' name='categoria' className='input-modal' onChange={handleGetValues}/>
              <input type="text" placeholder='Quantidade a ser cadastrada' name='quantidade' className='input-modal' onChange={handleGetValues}/>
              <button className='modal-button' onClick={handleEditProduct}>CONFIRMAR ALTERAÇÃO</button>
            </>
        )}

        {step === 'produto-data' && (
          <>
            {produto && produto.map((item) => {
              if(item.idproduto === id){
                return(
                  <>
                  <h2 className='modal-title'>Nome: <span>{item.nome}</span></h2>
                  <div className=""></div>
                  <h2 className='modal-title'>Preço: <span>{item.preco}</span></h2>
                  <h2 className='modal-title'>Categoria: <span>{item.categoria}</span></h2>
                  <h2 className='modal-title'>Quantidade: <span>{item.quantidade}</span></h2>
                  <button className='modal-button' onClick={() => {
                    setStep('req-imagem-produto')
                  }}>Ver foto do produto</button>
                  </>
              )
              }
          <div className="produto-data-section">
            <h1 className='modal-title'>INFORMAÇÕES DO PRODUTO:</h1>

          </div>
            })}
          </>
        )}

        {step === 'req-imagem-produto' && (
          <>
          {produto && produto.map((item) => {
            if(item.idproduto === id) {
              return(
                <img src={item.data} alt="" className='req-imagem-produto-step'/>
              )
            }
          })}
          </>
        )}

          </div>
    </div>
    
    </>
  )
}
}

export default RegisterProduct;