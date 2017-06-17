//alter user carlos password '  '

var express = require('express');
var app = express();
var pg = require('pg');

var bodyParser = require('body-parser');
//to get the posts working you add bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function Message(title, body){
	this.title = title;
	this.body = body;
}

function getMessages(){
	var allMessages=[];
	var oneMessage = {};
	pg.connec('postgres://Carlos:Skyline@localhost/bulletin_board', function(err, client, done){
		if(err){
			console.error(err);
		}else{
			client.query('SELECT * FROM messages', function(err, result){
				if (err){
					console.error(err);
					return done(client)
				}else{
					//result.rows
					for(var i = 0; i < result.rows.length; i++){
						allMessages.push( result.rows[i] );
					};
					console.log(allMessages);
					response.send(allMessages);
					done();
					pg.end();
					return allMessages;
				}
			})
		}
	})
}

app.get('/messages', function(request, response){
	var messagesResult = getMessages();
	console.log( 'messagesResult: ${allMessages}');
	// response.render( messagesResult);

});

app.post('/messages' function(request, response){
	console.log(request.body.title);
	console.log(request.body.body);
})

app.listen(3005, function() {
	console.log('bulletin Board codealong listening on port no. 3005');
});