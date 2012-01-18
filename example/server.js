var express = require('express'), 
    YuiComboHandler = require('../lib/express-yuicombo').YuiComboHandler;
    
var app = express.createServer();

app.use(express.static('./public'));

app.get('/', function(req, res){
	res.redirect('/demo.html');
});

// Install the combo route and sets the root folder for files
app.get('/yui-combo', YuiComboHandler('./public/') );

app.listen(3000);

console.log("listening on http://localhost:3000");
