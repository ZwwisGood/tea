const mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'admin123',
    database: 'vue_store'
})

module.exports = connection