import { con } from "./conn"
import { QueryError,RowDataPacket } from "mysql2"

export function getAllItems() {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM item WHERE 1", (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}

export function getItemById(id:number) {
    return new Promise((result, reject) => {
        con.query("SELECT * FROM item WHERE id=?",[id], (err:QueryError, data:RowDataPacket) => {
            if (err) reject(err)
            else result(data)
        })
    })
}