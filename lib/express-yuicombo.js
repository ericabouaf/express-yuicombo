var fs = require('fs');

exports.YuiComboHandler = function(path_prefix) {
	return function(req, res){
		var querystring = req.url.split('?')[1],
			 modules = querystring.split('&');
		
		var MODE = "JS";
		if(modules[0].indexOf(".css") != -1) {
			MODE = "CSS";
		}
		
		var ret = "", fileCount = 0;
		modules.forEach(function(f) {
			fs.readFile(path_prefix+f, encoding="utf8", function(err, data) {
				fileCount++;
				
				// Fix CSS assets path
				if(MODE == "CSS") {
					var l = f.split('/'), fp = l.slice(0,l.length-1);
					data = data.replace(/url\(\s*["']?([^"'\)]+)["']?\s*\)/g,"url("+fp.join('/')+"/$1)");
				}
				
				ret += data;
				
				if(err) {
					console.log("YuiComboLoader error : ");
					console.log(err);
					res.send(err);
				}
				else if(fileCount == modules.length) {
					
					// CSS Handling
					if(MODE == "CSS") {
						res.header("Content-Type", "text/css");
					}
					// JS Handling
					else {
						res.header("Content-Type", "application/javascript");
					}
					
					// Cache-Control
					// TODO: make configurable
					res.header('Expires', new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 365 * 10)) );
					res.header('Age', '300');
					res.header('Cache-Control', 'max-age=315360000');
					
					
					res.header('Date', new Date() );
					res.send(ret);
				}
			});
		});
	};
};
