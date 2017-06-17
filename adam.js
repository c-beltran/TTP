var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'ejs');

function Message(title,body) {
	this.title = title;
	this.body = body;
};

// function getMessages(){
//   var allMessages = [];
//   var oneMessage = {};
//   pg.connect('postgres://Carlos:Skyline@localhost/bullietin_board', function(err, client, done) {
//     if(err){
//       console.log(err);   // error handling
//       if(client){
//         done(client);
//       }
//       return;
//     }else{
//       client.query('select * from messages',
//         function(err, result) {
//         if(err){
//           console.log(err);   //error handling
//           return done(client);
//         }else{
//           for(var i=0; i < result.rows.length; i++){
//             allMessages.push(result.rows[i]);
//           }
//           console.log(`allMessages: ${allMessages}`);
//           return allMessages;
//           done();
//           pg.end();
//         }
//         });
//     }
//    });
// }

// app.get('/', function(request,response) {
// 	//response.render('index', {allMessages: allMessages});
// });

app.get('/messages', function(request,response) {
  var allMessages = [];
  pg.connect('postgres://Carlos:Skyline@localhost/bullietin_board', function(err, client, done) {
    if(err){
      console.log(err);   // error handling
      if(client){
        done(client);
      }
      return;
    }else{
      client.query(`select * from messages`,
        function(err, result) {
        if(err){
          console.log(err);   //error handling
          return done(client);
        }else{
          for(var i=0; i < result.rows.length; i++){
            allMessages.push(result.rows[i]);
          }
          console.log(allMessages);
          response.render('index', {allMessages: allMessages});
          //response.send( allMessages );
          done();
          pg.end();
        }
        });
    }
   });
});

app.post('/message', function(request, response) {
  console.log(request.body.title);
  console.log(request.body.messagebody);
  pg.connect('postgres://Carlos:Skyline@localhost/bullietin_board', function(err,client,done) {
  	if (err) {
  		console.error(err);
  		if (client) {
  			done(client);
  		}
  		return;
  	} else {
  		client.query(`INSERT INTO messages (title, body) VALUES ($1, $2)`, [request.body.title, request.body.messagebody], function(err,result) {
	  		if (err) {
		  		console.log(err);
		  		return done(client);
		  	} else {
                response.redirect('/messages');
		  	}
		});
  	}
  })
});

app.listen( 3009, function() {
	console.log('Bulletin Board Codealong listening on port no. 3007.');
});