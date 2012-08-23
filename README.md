[![build status](https://secure.travis-ci.org/neyric/express-yuicombo.png)](http://travis-ci.org/neyric/express-yuicombo)
# Express.js YUI Combo Loader

Very early version

Only works with YUI 3.4+ ? (yui-loader asking for all dependencies, no implicit)

## TODO :

 * disk cache

## Install

    npm install express-yuicombo

## Server-Side Use

    var express = require('express'), 
        YuiComboHandler = require('express-yuicombo').YuiComboHandler;
    
    var app = express.createServer();
    
    app.use(express.static('./public'));
    
    app.get('/', function(req, res){
        res.redirect('/demo.html');
    });
    
    // Install the combo route and sets the root folder for files
    app.get('/yui-combo', YuiComboHandler('./public/') );
    
    app.listen(3000);
    
    console.log("listening on http://localhost:3000");
    

## Client-side
      
      YUI({
         // set 'combine' to false during client-side development
      	combine: true,
      
      	// set the same URL on which you installed express-yuicombo in your routes
      	comboBase: '/yui-combo?',
      
      	groups : {
      		myDemoModules : {
      			base: "mydemomodules/",
      			root : "mydemomodules/",
      			filter: 'raw',
      			modules : {
      				'my-yui-module' : {
      					requires : ['widget', 'widget-stdmod']
      				}
      			}
      		}
      	}
      }).use('my-yui-module'/*, function(Y) {}*/);

## Author

Eric Abouaf

http://github.com/neyric

