const mysql = require('mysql');

const connector = mysql.createConnection(
    {
        host: 'localhost',
        user: 'Diego',
        password: 'Diego@008**$',
        database: 'login-register',
    }
)

const connect = () => {
    connector.connect(err => {
        if (err) throw err;
        console.log('Connected to database')
    })
}

module.exports = {
    pool: connector,
    connect
}