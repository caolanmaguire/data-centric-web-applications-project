const MongoClient = require('mongodb').MongoClient
var coll

MongoClient.connect('mongodb://127.0.0.1:27017')
    .then((client) => {
        db = client.db('proj2023MongoDB')
        coll = db.collection('managers')
    })
    .catch((error) => {
        console.log(error.messge)
    })

var findAll = function () {
    return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
            .then((documents) => {
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}


var find = async function(query){
    x = await new Promise((resolve, reject) => {
        var cursor = coll.find(query)
        cursor.toArray()
        .then((documents) => {
            resolve(documents)
        })
        .catch((error) => {
            reject(error)
        })
    })
    return(x);
}

var addEmployee = function (id, nm, sal) {
    console.log('going here')
    return new Promise((resolve, reject) => {
        var details = {
            _id: id,
            name: nm,
            salary: sal
        }
        var cursor = coll.insertOne(details)
        // cursor.toArray()
        //     .then((documents) => {
        //         console.log('ok')
        //         resolve(documents)
        //     })
        //     .catch((error) => {
        //         console.log('error')
        //         reject(error)
                
        //     })
    })
}

module.exports = { findAll, addEmployee, find }