//Servidor
const express = require('express')
const server = express()
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/view', {
    express: server,
    noCache: true
})

server
//receber os dados do req.body
.use(express.urlencoded({ extended: true}))
//Configuração do caminho statico do servidor(css, scripts, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/give-classes', pageGiveClasses)
.post('/save-classes', saveClasses)
.listen(5500)