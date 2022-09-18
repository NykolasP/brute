import { con } from "./conn"
import { QueryError,RowDataPacket } from "mysql2"

export function getAllRobotExpectUser(id:number) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM robot WHERE id!=?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}
export function getUserRobot(id:number) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM robot WHERE id_compte=?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data[0])
        })
    })
}
export function getRobot(id:string) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM robot WHERE id=?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data[0])
        })
    })
}
export function addRobot(pseudo: string,force: number,esquive: number,defense: number,pv: number,niveau: number,experience: number,argent: number,email:string, id_compte:number) {
    return new Promise((result, reject) => {
        con.query("INSERT INTO `robot`(`pseudo`, `force`, `esquive`, `defense`, `pv`, `niveau`, `experience`, `argent`, `email`, `id_compte`) VALUES (?,?,?,?,?,?,?,?,?,?)", [
            pseudo, force, esquive, defense, pv, niveau, experience, argent, email, id_compte
        ], (err: QueryError, res: RowDataPacket) => {
            if (err) reject(err)
            else result(res)
        })

    })
}