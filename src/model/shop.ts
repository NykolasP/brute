import { con } from "./conn"
import { QueryError,RowDataPacket } from "mysql2"

export function getAllItemsShop() {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM `shop` s JOIN item i on i.id = s.id_item", (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

export function getItemById(id:number) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM shop WHERE id=?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

export function addItemRobot(idUtilisateur:string,idItem:string) {
    return new Promise((result, reject) => {
        con.query("INSERT INTO `robot_item`(`id_robot`, `id_item`) VALUES (?,?)", [
            idUtilisateur,idItem
        ], (err: QueryError, res: RowDataPacket) => {
            if (err) reject(err)
            else result(res)
        })

    })
}

export function getAllItemsRobot(id:number) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM `robot_item` r JOIN item i on i.id = r.id_item WHERE r.id_robot =?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}