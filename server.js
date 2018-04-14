// Set up
var express  = require('express');
var app      = express();
var mysql = require('mysql');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
 
// Configuration
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "JADE2018",
    database: "jademysql"
  });
 
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

function getCliente(callback) {    
    console.log("Cliente");
    con.query("SELECT nombre as Nombre,apellidos as Apellidos, telefono1 as Telefono, email as Email FROM clientes order by Nombre",
        function (err, rows) {
            console.log("rows:");
            console.log(rows);
            
            //here we return the results of the query
            callback(err, rows); 
            
        }
       
    );    
}


app.post('/clientes', function(req, res, next) {   
    //now you can call the get-driver, passing a callback function
    getCliente(function (err, clienteResult){ 
         if(err){
            res.send(err);
        } else {
            res.json(clienteResult);
        }
    });
});

function getServicios(callback) {    
    console.log("Servicios");
    con.query("SELECT idServicio , dsServicio, idPadre, inPrecio, inTiempo, inTipoIVA FROM jademysql.Servicios s left join jademysql.TipoIva ti on s.idTipoIVA=ti.idTipoIVA order by idServicio",
        function (err, rows) {
            console.log("rows:");
            console.log(rows);
            
            //here we return the results of the query
            callback(err, rows); 
        }
    );    
}


app.post('/servicios', function(req, res, next) {   
    //now you can call the get-driver, passing a callback function
    getServicios(function (err, servicioResult){ 
        if(err){
            res.send(err);
        } else {
            res.json(servicioResult);
        }
    });
});


// listen
app.listen(8080);
console.log("App listening on port 8080");
