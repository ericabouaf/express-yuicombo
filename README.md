# Express.js YUI Combo Loader

Very early version

Only works with YUI 3.4+ ? (yui-loader asking for all dependencies, no implicit)

## TODO :

 * disk cache

## Install

   npm install express-yuicombo

## Server-Side Use

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
    

## Author

Eric Abouaf

http://github.com/neyric

