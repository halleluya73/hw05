
var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'mygame.crmzrpehq685.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'MYGAME'

});

connection.connect(function (err) {

    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);
});

app.get('/user/add', function (req, res) {
    var name = req.query.name;
    var password = req.query.password;
    var score = req.query.score;




    var ID = [[name, password,score]];
    AddUserID(ID, function (err, result) {
        res.end(result);
    });

});
app.get('/user/id',function(req,res){

    ShowUserID(function(err,result){
        res.end(result);
    })
})

app.get('/user/login/:name',function(req,res){

    var login =req.params.name;

    LoginUserID(login,function(err,resualt){
        res.end(resualt);
    })
})


var server = app.listen(8081, function () {
    console.log('Server Running');

});


function AddUserID(ID, callback) {
    var sql = 'INSERT INTO Game1(name,password,score) values ?';


    connection.query(sql, [ID], function (err) {
        var res = '[{"success" : "true"}]';
        if (err) {

            res = '{["success" : "false"]}';
            throw err;
        }

        callback(null, res);

    });
}
    function ShowUserID(callback) {
        var sql = 'SELECT name,score FROM Game1 ORDER BY score DESC limit 10';

        connection.query(sql, function (err,rows,fields) {
            if (err) throw err;

        json = JSON.stringify(rows);

        callback(null,json);
    });
}
    function LoginUserID(name,callback) {
        var json = '';
        var sql = 'SELECT name,password FROM Game1 WHERE name = ?'
        connection.query(sql,[name], function (err, rows, fields) {
            if (err) throw err;
    
            json = JSON.stringify(rows);
    
            callback(null,json);
        });
    }
