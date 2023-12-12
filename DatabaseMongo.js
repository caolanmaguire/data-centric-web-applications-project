var MongoClient = require('mongodb').MongoClient;

var db;
var coll;

async function run() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);
    try {
        const database = client.db('proj2023MongoDB');
        const movies = database.collection('managers');
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

connection = run();

module.exports = {
    getemployeesMongo: function () {
        run();
        var coll;
        return new Promise((resolve, reject) => {
            cursor = coll.find()
            cursor.toArray()
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },

    getemployeesMongoAdd: function () {
        return new Promise((resolve, reject) => {
            coll.insertOne(employee)
                .then((documents) => {
                    resolve(documents)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

}