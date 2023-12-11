import { randomUUID } from "crypto"


export class DatabaseMemory{
    #artistas = new Map()

list(search){
    return Array.from(this.#artistas.entries()).map((artistaArray) => {
        const id = artistaArray[0]

        const data = artistaArray[1]
        
        return{
            id,
            ...data,
        }
    }) 
    .filter(artista => {
        if (search) {
        return artista.nome.includes(search)
    }
        return true
    })

}

    create(artista){
        const artistaId = randomUUID()
        this.#artistas.set(artistaId, artista)
    }
    
    update(id, artista){
        this.#artistas.set(id, artista)
    }

    delete(id, artista){
        this.#artistas.delete(id, artista)
    }
}