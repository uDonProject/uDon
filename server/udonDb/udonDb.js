import mysql from 'mysql'
import dotenv from 'dotenv'
//env 셋팅
dotenv.config()

const db = mysql.createConnection({
    
    user : '',
    host : '',
    password: '',
    database: ''

})

export default db;