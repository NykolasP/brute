class Arme extends Object{
    #type:Arme
    #modForce:number
    #modEsquive:number

    constructor (type, modForce, modEsquive) {
        super()
        this.#type = type
        this.#modForce = modForce
        this.#modEsquive =  modEsquive
    }

    get type() {
        return this.#type
    }

    get modForce() {
        return this.#modForce
    }

    get modEsquive() {
        return this.#modEsquive
    }
}