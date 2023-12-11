import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Jeon Jungkook'
})

server.post('/artista', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {nome, idade, generomusical} = request.body
    database.create({
        nome: nome,
        idade:  idade,
        generomusical:  generomusical,
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/artista', (request) => {
    const search = request.query.search

    console.log(search)

    const artistas = database.list(search)
    
    return artistas
})

server.put("/artista/:id",(request, reply) => {

    const artistaId = request.params.id 
    const {nome, idade, generomusical} = request.body
    const artista = database.update(artistaId, {
        nome,
        idade,
        generomusical,
    })
    return reply.status(204).send()
})

server.delete("/artista/:id", (request, reply) => {
    const artistaId = request.params.id 
  
    database.delete(artistaId)

    return reply.status(204).send()
})



server.listen({
    port: 3333,
})