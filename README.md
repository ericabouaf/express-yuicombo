# Express.js YUI Combo Loader

Only works with YUI 3.5+ ? (loader asking for all dependencies)

Very early

## TODO :


* TODO: correct assets path /url\([\"\']?(.*)[\"\']?\)/
* TODO: cache generated files

## Install

   npm install express-yuicombo

## Usage

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
    

## Author

Eric Abouaf 
http://github.com/neyric

