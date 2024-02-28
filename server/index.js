const express = require('express');
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10
app.use(cors())
app.use(express())
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Conexão com banco de dados
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ogaihT_L1ma',
    database: 'skateshop',
})

//CADASTRO --- CADASTRO --- CADASTRO --- CADASTRO --- CADASTRO

app.post('/register', (req, res) => {
    const { nome } = req.body
    const { sobrenome } = req.body
    const { email } = req.body
    const { senha } = req.body

    //validação se o usuário já foi cadastrado
    db.query("SELECT * FROM cliente WHERE email = ?", [email], (err, result) => {
        if(err) res.send(err)

    //cadastro do novo usuário
        if(result.length == 0){
            bcrypt.hash(senha, saltRounds, (erro, hash) =>{
                db.query("INSERT INTO cliente (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)", [nome, sobrenome, email, hash], (err, result) => {
                    if(err){
                        res.send(err)
                    }
                    res.send({msg: 'Cadastrado com sucesso!'})
                })
            })
        }else{
            res.send({msg: 'Usuário já cadastrado'})
        }
    })
})

//LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN
app.post('/login', (req, res) =>{
    const {email} = req.body
    const {senha} = req.body

    //Verificação se o email está correto
    db.query("SELECT * FROM cliente WHERE email = ?", [email], (err, result) =>{
        if(err){
            res.send(err)
        }
        
        if(result.length > 0){
        //Verificação da senha criptografada
            bcrypt.compare(senha, result[0].senha, (erro, result) => {
                //Tratamento de erro
                if(result){
                    res.send('Login efetuado com sucesso!')
                }
                else{
                    res.send('Senha incorreta')
                }
            })
        }
        else{
            //Se não encontrar usuário no banco de dados retorna que o usuário não existe
            res.send('Usuário não cadastrado!')
        }
    })
})


//Cadastro de produtos

app.post('/postProduct', (req, res) =>{
    const {nome} = req.body
    const {preco} = req.body
    const {categoria} = req.body
    const {quantidade} = req.body

    //Verifica se o produto já foi cadastrado
    db.query("SELECT * FROM produto WHERE nome = ? and categoria = ?", [nome, categoria], (err, result) => {
        if(err) res.send(err)

    //cadastro do novo produto
        if(result.length == 0){
            db.query("INSERT INTO produto (nome, preco, categoria, quantidade) VALUES (?, ?, ?, ?)", [nome, preco, categoria, quantidade], (err, result) => {
                if(err){
                    res.send(err)
                }
                else{
                    res.send('Produto cadastrado com sucesso!')
                }
            })
        }
        //Mensagem de erro para caso o produto já esteja cadastrado no banco de dados
        else{
        res.send('Este produto já foi cadastrado')
        }
    })
})

app.get('/getProduct', (req, res) =>{

    db.query("SELECT * FROM produto", (err, result) =>{
        if(err) res.send(err)
        else res.send(result)
    })

})

app.delete('/deleteProduct/:id', (req, res) =>{
    const {id} = req.params

    db.query('DELETE FROM produto WHERE idproduto = ?', [id], (err, result) =>{
        if(err) console.log(err)
        if(result.lenght > 0){
            res.send('Algo não ocorreu como deveria')
        }
        else{
            res.send('Produto deletado com sucesso!')
        }
    })
})

app.put('/editProduct', (req, res) => {
    const {nome} = req.body
    const {preco} = req.body
    const {categoria} = req.body
    const {quantidade} = req.body

    db.query("UPDATE produto SET nome = ?, preco = ?, categoria = ?, quantidade = ?", [nome, preco, categoria, quantidade], (err, result) => {
        if(err) console.log(err)
        
        if(result.length > 0 ){
            res.send('Algo não ocorreu como deveria')
        }
        else{
            res.send('Alteração concluída com sucesso!')
        }
    })
})


app.listen(5174, () =>{
    console.log('rodando servidor na porta: ' + 5174)
})