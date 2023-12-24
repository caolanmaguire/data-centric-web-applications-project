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

        //console.log(html)
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

var bodyParser = require('body-parser')

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

    var path = __dirname + '/views/home.ejs';
    console.log(path)

    res.render(path)
})

app.get('/stores', (req, res) => {

    html = '<link rel="stylesheet" type="text/css" href="../css/index.css"/><h1>Stores</h1><br/><a href="/">Add Store</a><table border="1px" cellspacing="0">'
    html = html + '<tr><th>SID</th> <th>Location</th> <th>Manager ID</th> <th>Action</th></tr>'

    connection.query('select * from store', (err, rows, fields) => {

        arrayLength = rows.length;
        for (var i = 0; i < arrayLength; i++) {
            html = html + '<tr> <td>' + rows[i]["sid"] + '</td> <td>' + rows[i]["location"] + '</td> <td>' + rows[i]["mgrid"] + '</td>' + '<td><a href="/stores/edit/' + rows[i]['sid'] + '">Update</a></td>' + '</tr>'
        }

        html = html + '</table><br/><a href="/">Home</a>'
        res.send(html);
    })

})

app.get("/stores/edit/:sid", (req, res) => {

    sid = req.params['sid']
    query = 'select * from store where sid ="' + sid + '"'
    connection.query(query, (err, rows, fields) => {

        mgrid = rows[0]['mgrid']
        location = rows[0]['location']

        console.log(mgrid)

        res.send('<h1>Edit Store</h1><br/> <script></script><% if (errors != undefined) { %> <ul> <% errors.forEach((error) => { %> <li><%= error.msg %></li> <% }) %> </ul> <% } %> </script> <form action="/editstore" method="post"> <p>SID <input  name="sid" value="' + req.params['sid'] + '" type="text" /></p><p>Location <input type="text" name="location" value="' + location + '" /></p><p>Manager ID <input type="text" name="mgrid" value="' + mgrid + '" /></p> <input type="submit" value="Add"> </form> <br/><br/> <a href="/">Home</a>');

    })
})

app.post("/editstore", (req, res) => {
    res.send(req.body.mgrid, req.body.location, req.body.sid);

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
        console.log(pid);
        console.log(rows.length)
        if (rows.length == 0) {
            console.log('delete this product')
            console.log(pid)
            //res.send('will delete this product')
            query = 'delete from product where pid ="' + pid + '"'
            connection.query(query, (err, rows, fields) => {
                console.log(rows)
                res.redirect('/products')
            })

        } else {
            res.send('<h1>Error Message</h1><br/><br/> <h1>' + req.params['pid'] + ' is currently in stores and cannot be deleted</h1> <a href="/">Home</a>')
        }

    })
})

app.get('/managers', (req, res) => {
    DatabaseMongo.findAll()
        .then((data)=>{
            // array = data
            html = '<link rel="stylesheet" type="text/css" href="../css/index.css"/><h1>Managers</h1> <a href="/managers/add">Add Manager (MongoDB)</a> <table border="1" cellspacing="0"><tr><th>Manager ID</th><th>Name</th><th>Salary</th>'
            var dataLength = data.length;

            for(var i = 0; i < dataLength; i++) {
                html = html + '<tr><td>' + data[i]['_id'] + '</td> <td>' + data[i]['name'] + '</td> <td>' + data[i]['salary'] + '</td></tr>'
            }
            html = html + '</table> <a href="/">Home</a>'
            res.send(html)
        })    
})

app.get('/managers/add', (req, res) => {
    var path = __dirname + '/views/addM.ejs';
    console.log(path)
    res.render(path)
    // DatabaseMongo.addEmployee(id, nm, sal, titl);
})

app.post("/managers/add/add", (req, res) => {
    // ManID, Name, Salary
    // res.send(req.body.ManID, req.body.Name, req.body.Salary);
    DatabaseMongo.addEmployee(req.body.ManID, req.body.Name, req.body.Salary);
    var path = __dirname + '/views/addM.ejs';
    console.log(path)
    res.render(path)
})

// connection.end()