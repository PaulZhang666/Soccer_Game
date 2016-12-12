/**
 * Created by FuriosA on 15/11/2016.
 */
var mysql = require('mysql');

var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Henry14dearsenal@',
    port:'3306',
    database:'soccer_project'
});

function sqlConn(){
    conn.connect(function(err){
        if(err){
            console.log('Connection err:' + err);
            return;
        }
        console.log('connect succeed!');
    });
}

// function sqlQuery(query){
//     conn.query(query, function(err, rows, fields){
//         if(err){
//             console.log('Query err:' + err);
//             return;
//         }
//         socket.emit('receive_name', rows);
//     });
// }

function sqlClose(){
    conn.end(function(err){
        if(err){
            return;
        }
        console.log('disconnect succeed!')
    });
}

sqlConn();

//var teamListQuery = "select * from FootballClub f, LineUp l where f.id = l.id";

//---------------------------------------------------

var io = require('socket.io').listen(8100); // initiate socket.io server

io.sockets.on('connection', function (socket) {
    socket.emit('news', "Connected to the local server"); // Send data to client

    // wait for the event raised by the client
    socket.on('requestSocket', function (data) {
        conn.query(data, function(err, rows, fields){
            if(err){
                console.log('Query err:' + err);
                return;
            }
            socket.emit('socketResult', rows);
        });
    });

});





