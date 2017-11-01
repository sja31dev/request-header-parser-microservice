var express = require('express');
var app = express();
app.enable('trust proxy');

app.get('/whoami', function(req, res) {
  try {
    // Grab the client IP address. Needs the "app.enable('trust proxy');" above
    var ip = req.ip; 
    // Grab the first language, from the start of accept-language to the first comma
    var lang = req.headers['accept-language'].match(/^(.*?)\,/)[1]; // .*? is a non-greedy match
    // Grab the operating system into, Between the first set of brackets of user-agent
    var sw = req.headers['user-agent'].match(/\((.*?)\)/)[1]; // .*? is a non-greedy match
    res.json({
      ipaddress: ip,
      language: lang,
      software: sw
    });
  } catch (e) {
    res.sendStatus(500);
  }
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

