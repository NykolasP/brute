import { addUser } from "../model/utilisateur"

class Utilisateur {
    #id:number
    #email:string
    #mdp:string
    #nom:string
    #prenom:string

    constructor(i:number, e:string, m:string, n:string, p:string) {
        this.#id = i
        this.#email = e
        this.#mdp = m
        this.#nom = n
        this.#prenom = p
    }

    get Email() {
        return this.#email
    }
    get Nom() {
        return this.#nom
    }
    get Prenom() {
        return this.#prenom
    }
    get Id() {
        return this.#id
    }

    addUtilisateur(e:string, m:string, n:string, p:string) {
        addUser(e, m, n, p)
    }

}

module.exports = Utilisateur