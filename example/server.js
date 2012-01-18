var express = require('express'), 
    YuiComboLoader = require('../lib/yuicombo').YuiComboLoader;
    
var app = express.createServer();

app.use(express.static('./public'));

app.get('/', function(req, res){
	res.redirect('/demo.html');
});

app.get('/yui-combo', YuiComboLoader('./public/') );

app.listen(3000);

console.log("listening on http://localhost:3000");
