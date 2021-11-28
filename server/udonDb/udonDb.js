import mysql from 'mysql'
import dotenv from 'dotenv'
//env 셋팅
dotenv.config()

const db = mysql.createConnection({
    
    user : process.env.DB_HOST,
    host : process.env.DB_USER,
    password: process.env.DB_DATABASE,
    database: process.env.DB_PASSWORD

})

export default db;