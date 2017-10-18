

/*var fs = require('fs');*/
var express = require('express');
var app = express();

app.get('/:string', function(req, res) {
  
  res.sendStatus(500);
});

  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

