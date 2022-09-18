import { con } from "./conn"
import { QueryError,RowDataPacket } from "mysql2"

export function getAll() {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM utilisateur ", (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}
export function getByEmail(email: string) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM utilisateur WHERE email=?", [email], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data[0])
        })
    })
}

export function getConnexion(login: string, mdp: string) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM utilisateur WHERE email=? AND mdp=?", [login,mdp], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data[0])
        })
    })
}

export function addUser(email: string,mdp: string,nom: string, prenom: string) {
    return new Promise((result, reject) => {
        con.query("INSERT INTO utilisateur (email,mdp,nom,prenom) VALUES (?,?,?,?)", [
            email, mdp, nom, prenom
        ], (err: QueryError, res: RowDataPacket) => {
            if (err) reject(err)
            else result(res)
        })
    })
}
