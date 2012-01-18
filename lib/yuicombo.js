var fs = require('fs');

exports.YuiComboLoader = function(path_prefix) {
   return function(req, res){

   	var querystring = req.url.split('?')[1];
   	var modules = querystring.split('&');
	
	
   	// Response Headers
   	if(modules[0].indexOf(".css") != -1) {
   		res.header("Content-Type", "text/css");
   	}
   	else if(modules[0].indexOf(".js") != -1) {
   		res.header("Content-Type", "application/javascript");
   	}
   	res.header('Expires', new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 365 * 10)) );
   	res.header('Age', '300');
   	res.header('Cache-Control', 'max-age=315360000');
   	res.header('Date', new Date() );
	
   	// Combine the files :
   	var ret = "";
   	var fileCount = 0;
   	modules.forEach(function(f) {
   		fs.readFile(path_prefix+f, encoding="utf8", function(err, data) {
   			fileCount++;
   			ret += data;
   			if(err) {
   				console.log("YuiComboLoader error : ");
   				console.log(err);
   				res.send(err);
   			}
   			else if(fileCount == modules.length) {
   				res.send(ret);
   			}
   		});
   	});
	
   };

};
