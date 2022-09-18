import { addRobot } from "../model/robot"

export class Robot {
    #pseudo:string
    #force:number
    #esquive:number
    #defense:number
    //#objets:Objet[]
    #pv:number
    #niveau:number
    #exprerience:number
    #argent:number
    //#tenue:Tenue|null
    //#bouclier:Bouclier|null
    //#arme:Arme|null
    #email:string
    #id_compte:number

    constructor(pseudo:string, force:number, esquive:number, defense:number, pv:number, niveau:number, experience:number, argent:number, email:string,id_compte:number) {
        this.#pseudo = pseudo
        this.#force = force
        this.#esquive = esquive
        this.#defense = defense
        this.#pv = pv
        this.#niveau = niveau
        this.#exprerience = experience
        this.#argent = argent
        this.#email = email
        this.#id_compte = id_compte
    }


    public set pv (pv:number){
        this.#pv = pv
    }

    public set niveau (niveau:number){
        this.#niveau = niveau
    }

    public set experience (experience:number){
        this.#exprerience = experience
    }

    public set argent (argent:number){
        this.#argent = argent
    }

    addRobotUser(){
        addRobot(this.#pseudo, this.#force, this.#esquive,this.#defense,this.#pv,this.#niveau,this.#exprerience,this.#argent,this.#email, this.#id_compte)
    }

    lancerDeDes(chiffre1:number,chiffre2:number){
        chiffre1 = Math.ceil(chiffre1);
        chiffre2 = Math.floor(chiffre2);
        return Math.floor(Math.random() * (chiffre2 - chiffre1 +1)) + chiffre1;
    }

    combat(robot:Robot){
        let retour=""
        let tour=true

        while(this.#pv > 0 && robot.#pv > 0){
            if (tour){
                retour += this.#pseudo + " lance son attaque sur " + robot.#pseudo + "<br>"
                let esquive = false

                for (let i=0; i < robot.#esquive; i++){
                    let desResult = this.lancerDeDes(1,7)
                    if (desResult == 5) {
                        esquive = true
                    }
                }
                if (esquive) {
                    retour += robot.#pseudo + " esquive l'attaque de " + this.#pseudo + "<br>"
                } else {
                    if (robot.#defense < this.#force) {
                        robot.#pv -= this.#force - robot.#defense
                        retour += robot.#pseudo + " esquive l'attaque de " + this.#pseudo + "<br>"
                    }
                }
            } else {
                retour += robot.#pseudo + " lance son attaque sur " + this.#pseudo + "<br>"
                let esquive = false

                for (let i=0; i < this.#esquive; i++){
                    let desResult = this.lancerDeDes(1,7)
                    if (desResult == 5) {
                        esquive = true
                    }
                }
                if (esquive) {
                    retour += this.#pseudo + " esquive l'attaque de " + robot.#pseudo + "<br>"
                } else {
                    if (this.#defense < robot.#force) {
                        this.#pv -= robot.#force - this.#defense
                        retour += this.#pseudo + " esquive l'attaque de " + robot.#pseudo + "<br>"
                    }
                }
            }
            if (this.#pv <= 0) {
                retour += robot.#pseudo + " gagne !" + "<br>"
            } else if (robot.#pv <= 0) {
                retour += this.#pseudo + " gagne !" + "<br>"
            }
            tour = !tour
        }
        return retour
    }
}
