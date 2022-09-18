class Bouclier extends Object {
    #type:Bouclier
    #modDefense:number
    #modEsquive:number

    constructor (type, modDefense, modEsquive) {
        super()
        this.#type = type
        this.#modDefense = modDefense
        this.#modEsquive =  modEsquive
    }

    get type() {
        return this.#type
    }

    get modDefense() {
        return this.#modDefense
    }

    get modEsquive() {
        return this.#modEsquive
    }
}