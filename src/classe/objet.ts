class Objet{
    #id:number
    #nom:number
    #image:number

    constructor(numero,nom,image){
        this.#id = numero
        this.#nom = nom
        this.#image = image
    }

    get id() {
        return this.#id
    }

    get nom() {
        return this.#nom
    }

    get image() {
        return this.#image
    }
}