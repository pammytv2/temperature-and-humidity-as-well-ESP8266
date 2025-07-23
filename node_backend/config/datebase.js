const mysql = require ('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'esp8266'
});

connection.connect((err)=> {
    if (err){
        console.error ("Database connection faild: " + err);
        return;

    }
    console.log("Connection to Database ")
});

connection.on('error', (err) => {
    console.error('Database error: ' + err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connection.connect(); 
    } else if (err.code === 'ER_BAD_DB_ERROR') {
        throw err; 
    }
    else if (err.code ==='ECONNREFUSED') {
        console.error('Database connection refused. Please check if the database server is running.');
    }
});


module.exports = connection;
