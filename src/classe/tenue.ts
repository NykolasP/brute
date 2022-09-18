class Tenue extends Object{
    #type:Tenue
    #modDefense:number
    #modEsquive:number

    constructor (type, modDefense, modEsquive) {
        super()
        this.#type = type
        this.#modDefense = modDefense
        this.#modEsquive =  modEsquive
    }
}