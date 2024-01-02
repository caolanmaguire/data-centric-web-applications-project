//importing the modules
var express = require('express')
var os = require("os");
var ejs = require('ejs');
const { check, validationResult } = require('express-validator');
var bodyParser = require('body-parser')
const mysql = require('mysql')
const { MongoClient } = require("mongodb");
var express = require('express')
var app = express();
const cors = require('cors');
const path = require('path');
app.set("view engine", "ejs");
const { ReturnDocument } = require('mongodb');
//adding body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

async function run() {
    const uri = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri);
    try {
        const database = client.db('proj2023MongoDB');
        const movies = database.collection('managers');
        // Query for a movie that has the title 'Back to the Future'
        const query = {};
        const movie = await movies.find({}).toArray();

        html = '<h1>Managers</h1><br/><table border="1px">'
        html = html + '<tr><th>Managers</th> <th>Name</th> <th>Salary</th></tr>'

        arrayLength = movie.length;
        for (var i = 0; i < arrayLength; i++) {
            html = html + '<tr> <td>' + movie[i]["_id"] + '</td> <td>' + movie[i]["name"] + '</td> <td>' + movie[i]["salary"] + '</td>' + '</tr>'
        }
        return (JSON.stringify(html))
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}

var DatabaseMongo = require("./DatabaseMongo");
// Replace the uri string with your connection string
// import my javascript file that contains functions necessary
var DatabaseSql = require("./DatabaseSql");

var app = express();

var bodyParser = require('body-parser');
const { error } = require('console');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

var requests_counter = 0;
var counter = 0;

// connect to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2023'
})

connection.connect()

app.listen(3000, () => {
    console.log('server is listening')
})

app.use(express.static(__dirname))

app.use((req, res, next) => {
    res.counter = ++counter
    console.log('server accessed : ' + res.counter)
    next()
})

app.get('/', (req, res) => {
    console.log("/ Route");

    let data = {
        results: []
    }

    var path = __dirname + '/views/home.ejs';
    console.log(path)

    data = [];

    connection.query('select * from callbackproducts', (err, rows, fields) => {

        arrayLength = rows.length;
        for (var i = 0; i < arrayLength; i++) {
            data.push([rows[i]['ProductTitle'], rows[i]['Message']])
        }
        console.log(rows)
        res.render(path, { data: { results: data } });
    })
})

app.get('/stores', (req, res) => {
    data = [];

    connection.query('select * from store', (err, rows, fields) => {

        arrayLength = rows.length;
        for (var i = 0; i < arrayLength; i++) {
            data.push({ 'sid': rows[i]["sid"], 'location': rows[i]["location"], 'mgrid': rows[i]["mgrid"] });
        }
        var path = __dirname + '/views/stores.ejs';
        res.render(path, { data: { results: data } });
    })
})

app.get("/stores/edit/:sid", (req, res) => {

    sid = req.params['sid']
    query = 'select * from store where sid ="' + sid + '"'
    connection.query(query, (err, rows, fields) => {

        mgrid = rows[0]['mgrid']
        location = rows[0]['location']
        idManager = rows[0]['mgrid']

        var path = __dirname + '/views/store-edit.ejs';
        res.render(path, { errors: ['one'], data: [sid, location, idManager] });

    })
})


app.post("/stores/edit/:sid", async (req, res) => {
    // res.send(req.body.mgrid, req.body.location, req.body.sid);

    var error = [];

    // IF SID is not editable
    if (req.params['sid'] == req.body.sid) {
        // sid was not changed

        //IF Location is a minimum of 1 character
        if (req.body.location.length >= 1) {
            //Location is a minimum of 1 character

            //IF Manager ID is 4 characters
            if (req.body.mgrid.length >= 4) {
                // MANAGER ID IS 4 CHARACTERS.
                // {_id : "M001"}
                await DatabaseMongo.find({ _id: req.body.mgrid }).then((data) => {
                    // console.log(data.length);
                    if (data.length > 0) {

                        //Manager does exist
                    } else {
                        error.push("Manager: " + req.body.mgrid + " doesn't exist in MongoDB")
                    }
                });

                // IF Manager is not managing another store
                await DatabaseSql.checkIfManagerAlreadyPlaced(req.body.sid, req.body.mgrid).then((data) => {
                    if (data.length != 0) {
                        console.log('Manager: ' + req.body.mgrid + ' already managing another store')
                        error.push('Manager: ' + req.body.mgrid + ' already managing another store')
                    }
                })

                if(error == 0){
                    // no errors - push update
                    DatabaseSql.UpdateStore(req.body.sid, req.body.location, req.body.mgrid);
                }
                console.log(error);
            } else {
                error.push('manager id does not  4 characters')
            }
        } else {
            error.push('location must be at least 1 character');
        }
    }
    else {
        error.push('sid was edited : this is not allowed.');
    }

    sid = req.body.sid;
    location = req.body.location;
    idManager = req.body.mgrid;
    var path = __dirname + '/views/store-edit.ejs';
    res.render(path, { errors: error, data: [sid, location, idManager] });
})

app.get('/add-store', (req, res) => {
    var error = [];
    var path = __dirname + '/views/addStore.ejs';
    res.render(path, { errors: error });
})



app.post('/add-store', (req, res) => {
    var error = [];

    //location checks
    if(req.body.location.length == 0){
        error.push('location must have at least one character')
    }    

    if(error.length == 0){
        DatabaseSql.CreateNewStore(req.body.sid, req.body.location, req.body.ManID);
        res.redirect('/stores');
    }else{
        var path = __dirname + '/views/addStore.ejs';
        res.render(path, { errors: error });
    }
})

app.get('/products', (req, res) => {

    connection.query('SELECT p.pid, p.productdesc, s.sid, s.location, sct.Price FROM product p LEFT JOIN product_store sct ON p.pid = sct.pid LEFT JOIN store s ON sct.sid = s.sid;', (err, rows, fields) => {

        html = '<link rel="stylesheet" type="text/css" href="../css/index.css"/><h1>Products</h1><br/><table border="1px" cellspacing="0">'
        html = html + '<tr><th>Product ID</th> <th>Description</th> <th>Store ID</th> <th>Location</th> <th>Price</th> </th></tr>'

        arrayLength = rows.length;
        for (var i = 0; i < arrayLength; i++) {
            html = html + '<tr> <td>' + rows[i]["pid"] + '</td> <td>' + rows[i]["productdesc"] + '</td> <td>' + rows[i]["sid"] + '</td>' + '</td> <td>' + rows[i]["location"] + '</td> <td>' + rows[i]["Price"] + '</td> </td>' + '<td><a href="/products/delete/' + rows[i]["pid"] + '">Delete ' + rows[i]['productdesc'] + '</a></td>' + '</tr>'
        }

        html = html + '</table><br/><a href="/">Home</a>'
        res.send(html);
    })
})

app.get("/products/delete/:pid", (req, res) => {

    //select * from product_store where pid = "MLK2L"
    pid = req.params['pid']

    query = 'select * from product_store where pid ="' + pid + '"'
    connection.query(query, (err, rows, fields) => {
        if (rows.length == 0) {

            query = 'delete from product where pid ="' + pid + '"'
            connection.query(query, (err, rows, fields) => {
                res.redirect('/products')
            })

        } else {
            res.send('<h1>Error Message</h1><br/><br/> <h1>' + req.params['pid'] + ' is currently in stores and cannot be deleted</h1> <a href="/">Home</a>')
        }

    })
})

app.get('/managers', (req, res) => {
    DatabaseMongo.findAll()
        .then((data) => {
            // array = data
            html = '<link rel="stylesheet" type="text/css" href="../css/index.css"/><h1>Managers</h1> <a href="/managers/add">Add Manager (MongoDB)</a> <table border="1" cellspacing="0"><tr><th>Manager ID</th><th>Name</th><th>Salary</th>'
            var dataLength = data.length;

            for (var i = 0; i < dataLength; i++) {
                html = html + '<tr><td>' + data[i]['_id'] + '</td> <td>' + data[i]['name'] + '</td> <td>' + data[i]['salary'] + '</td></tr>'
            }
            html = html + '</table> <a href="/">Home</a>'
            res.send(html)
        })
})

app.get('/managers/add', (req, res) => {
    var path = __dirname + '/views/addM.ejs';
    res.render(path, { errors: ['Manager ID must be 4 characters', 'Name must be > 5 characters', 'Salary must be between 30,000 and 70,000'] });
})

app.post("/managers/add", async (req, res) => {

    var error = [];

    await DatabaseMongo.find({ _id: req.body.ManID }).then((data) => {
        // console.log(data.length);
        if (data.length > 0) {
            error.push("Manager: " + req.body.ManID + " already exists in MongoDB")
            //Manager does exist
        }
    });

    if (req.body.ManID.length != 4) {
        error.push('Manager ID must be 4 characters in length');
    }

    if (req.body.Name.length < 5) {
        error.push('Name must be > 5 characters');
    }

    if (req.body.Salary < 30000 || req.body.Salary > 70000) {
        error.push('Salary must be between 30,000 and 70,000');
        console.log('salary error was pushed')
    }

    if (error == 0) {
        DatabaseMongo.addEmployee(req.body.ManID, req.body.Name, req.body.Salary);
        error.push('Successfully added manager!');
    } else {
        error.push('Manager not added - address points above');
    }
    var path = __dirname + '/views/addM.ejs';
    res.render(path, { errors: error });
})

// connection.end()