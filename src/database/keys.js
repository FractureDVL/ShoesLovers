// PARA LOCAL ACTIVAR

// module.exports = {
//   database: {
//     connectionLimit: 10,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "shoes_lovers",
//   },
// };


// PARA DEPLOY ACTIVAR
const mysql = require('mysql')

module.exports = {

    database: {
        host: 'us-cdbr-east-05.cleardb.net',
        user: 'b22afc9f4a2146',
        database: 'heroku_7d7ccff9ddac8b9',
        password: 'b87d6787'
    }
}
