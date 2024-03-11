const express = require('express');
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const saltRounds = 10
const port = 5170
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
    const { cargo } = req.body
    const { email } = req.body
    const { senha } = req.body

    //validação se o usuário já foi cadastrado
    db.query("SELECT * FROM funcionario WHERE email = ?", [email], (err, result) => {
        if(err) res.send(err)

    //cadastro do novo usuário
        if(result.length == 0){
            bcrypt.hash(senha, saltRounds, (erro, hash) =>{
                db.query("INSERT INTO funcionario (nome, sobrenome, cargo, email, senha) VALUES (?, ?, ?, ?, ?)", [nome, sobrenome, cargo, email, hash], (err, result) => {
                    if(err){
                        res.send(err)
                    }
                    res.send({msg: 'Cadastrado com sucesso!'})
                })
            })
        } 
        else {
            res.send({msg: 'Usuário já cadastrado'})
        }
    })
})

//LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN --- LOGIN
app.post('/login', (req, res) =>{
    const {email} = req.body
    const {senha} = req.body

    //Verificação se o email está correto
    db.query("SELECT * FROM funcionario WHERE email = ?", [email], (err, result) =>{
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
    const {data} = req.body

    //Verifica se o produto já foi cadastrado
    db.query("SELECT * FROM produto WHERE nome = ? and categoria = ?", [nome, categoria], (err, result) => {
        if(err) res.send(err)

    //cadastro do novo produto
        if(result.length == 0){
            db.query("INSERT INTO produto (nome, preco, categoria, quantidade, data) VALUES (?, ?, ?, ?, ?)", [nome, preco, categoria, quantidade, data], (err, result) => {
                if(err){
                    res.send(err)
                }
                else{
                    res.send('true')
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
    //Traz todos os produtos cadastrados no banco de dados para o meu front-end
    db.query("SELECT * FROM produto", (err, result) =>{
        if(err) res.send(err)
        else res.send(result)
    })

})

app.delete('/deleteProduct/:id', (req, res) => {
    //id do produto que será deletado
    const {id} = req.params;

    //Deleta todas as informações do produto de acordo com o id dele
    db.query("DELETE FROM produto WHERE idproduto = ?", [id], (err, result) => {
        if(err) console.log(err)
        
        if(result){
            //mensagem caso a função de deletar funcione corretamente
            res.send('Produto deletado com sucesso!')
        }
        else{
            //mensagem caso a função de deletar não funcione
            res.send('Algo não ocorreu como deveria')
        }
    })
})

app.put('/editProduct', (req, res) => {
    //Declaração das variáveis que recebe os valores digitados pelo usuário no front-end
    const {id} = req.body
    const {nome} = req.body
    const {preco} = req.body
    const {categoria} = req.body
    const {quantidade} = req.body

    //Edita todos as informações do produto de acordo com o que o usuário digitar
    db.query("UPDATE produto SET nome = ?, preco = ?, categoria = ?, quantidade = ? WHERE idproduto = ?", [nome, preco, categoria, quantidade, parseInt(id)], (err, result) => {
        if(err) console.log(err)
        
        if(result){
            //mensagem caso a função de editar funcione corretamente
            res.send('true')
        }
        else{
            //mensagem caso a função de editar não funcione
            res.send('false')
        }
    })
})

app.get('/carrinho/:id', (req, res) => {
    const {id} = req.params
    
    db.query("SELECT * FROM produto WHERE idproduto = ?", [id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

app.get('/getFuncionario', (req, res) => {
    
    db.query("SELECT * FROM funcionario", (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})


app.delete('/deleteFuncionario/:id', (req, res) => {
    const {id} = req.params;

    db.query("DELETE FROM funcionario WHERE idFunc = ?", [id], (err, result) => {
        if(err) console.log(err)

        if(result){
            res.send('Funcionário deletado com êxito!')
        }
        else{
            res.send('Algo não ocorreu como deveria')
        }
    })
})

app.put('/editFuncData', (req, res) => {
    const {id} = req.body
    const {nome} = req.body
    const {sobrenome} = req.body
    const {email} = req.body
    const {cargo} = req.body
    
    db.query("UPDATE funcionario SET nome = ?, sobrenome = ?, email = ?, cargo = ? WHERE idFunc = ?", [nome, sobrenome, email, cargo, id], (err, result) => {
        if(err) console.log(err)

        if(result){
            res.send('true')
        }
        else{
            res.send('false')
        }
    })
})






//Declara a porta do servidor e inicia o servidor
app.listen(port, () =>{
    console.log('rodando servidor na porta: ' + port)
})