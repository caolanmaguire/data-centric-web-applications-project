// const pmysql = require('promise-mysql');
const mysql = require('mysql');
const { Connection } = require('promise-mysql');
var promiseMySQL = require('promise-mysql')
// connect to database

var pool;

promiseMySQL.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2023',
})
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
    })

var checkIfManagerAlreadyPlaced = function (sid, mgrid) {
    return new Promise((resolve, reject) => {
        editQuery = {
            sql: 'select * from store where mgrid = "' + mgrid + '" and sid !="' + sid + '"',
            values: [sid, mgrid]
        }
        pool.query(editQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })

}

// req.body.sid, req.body.location, req.body.mgrid
var UpdateStore = function (sid, location, mgrid) {
    return new Promise((resolve, reject) => {
        editQuery = {
            sql: 'UPDATE store SET mgrid = "' + mgrid + '", location = "' + location + '" WHERE sid = "' + sid + '"',
            values: [sid, mgrid]
        }
        pool.query(editQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })

}


// req.body.sid, req.body.location, req.body.mgrid
var CreateNewStore = function (sid, location, mgrid) {
    return new Promise((resolve, reject) => {
        insertQuery = {
            // INSERT INTO store (sid,location,mgrid) VALUES('CAL','Monaghan Town','M101');
            sql: 'INSERT INTO store (sid,location,mgrid) VALUES("' + sid+ '","' + location + '", "' + mgrid + '")',
            values: [sid, location, mgrid]
        }
        pool.query(insertQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })

}

module.exports = { checkIfManagerAlreadyPlaced, UpdateStore, CreateNewStore }