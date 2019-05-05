const express = require('express')
const morgan = require('morgan')
const app = express() 
const mysql = require('mysql')

app.use(morgan('short'))

app.get("/flashcards", (req, res) => {
    console.log("fetching index of flashacards: " + req.params.id)
    const connection = mysql.createConnection((
        host: "localhost",
        user: "root",
        database: "lbta_mysql"
    ))
    connection.query("SELECT + FROM users", (err, rows, fields) => {
        console.log("I think we fetched users successfully")
    })

    res.end()
});





app.listen()

app.listen(3002, () => {
    console.log("Server is up and listening on 3003...")
});




