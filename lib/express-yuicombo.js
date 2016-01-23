var fs = require('fs');

exports.YuiComboHandler = function(path_prefix) {
	
    // MAX_LENGTH = 1MB;
    var MAX_LENGTH = 1 * 1024 * 1024;
    var err, BASE_PATH;
    BASE_PATH = fs.realpathSync(path_prefix);

    console.log('YUI combo base path: ' + BASE_PATH);	
	
	return function(req, res){
		var querystring = req.url.split('?')[1],
			 modules = querystring.split('&');
		
		var MODE = "JS";
		if(modules[0].indexOf(".css") != -1) {
			MODE = "CSS";
		}
		
		var ret = "", fileCount = 0;
		modules.forEach(function(f) {
	            var filePath = path_prefix + f;
	            fs.realpath(filePath, function (err, resolvedPath) {
	                if (err) {
	                    console.log("resolve filepath error: " + err);
	                    res.send("Invalid file resolution");
	                    
	                } else {
	                    
	                    if (resolvedPath.length > BASE_PATH.length) {
	                        if (BASE_PATH == resolvedPath.substr(0, BASE_PATH.length))
	                            if (ret.length < MAX_LENGTH) {
	                                readFile(req, res, resolvedPath);
	                            }
	                            else {
	                                console.log('Too long combo response, ignoring the response');
	                            }
	                        }
	                        else {
	                            console.log("invalid resolved path: " + resolvedPath);
	                        }
	                    }
	                }); 		
		});
		

        /**
         * read the file and return content to the response
         * the file is not checked anymore, assume to be trusted
         * @param req http request
         * @param resp http response
         * @param filePath local file path
         * @returns {undefined}
         */
        function readFile(req, res, resolvedPath) {
            fileCount++;
            fs.readFile(resolvedPath, encoding = "utf8", function (err, data) {

                // Fix CSS assets path
                if (MODE == "CSS") {
                    var l = resolvedPath.split('/'), fp = l.slice(0, l.length - 1);
                    data = data.replace(/url\(\s*["']?([^"'\)]+)["']?\s*\)/g, "url(" + fp.join('/') + "/$1)");
                }

                ret = ret + data;

                if (err) {
                    console.log("YuiComboLoader error : ");
                    console.log(err);
                    res.send("Invalid file path");
                }
                else if (fileCount >= modules.length) {

                    // CSS Handling
                    if (MODE == "CSS") {
                        res.header("Content-Type", "text/css");
                    }
                    // JS Handling
                    else {
                        res.header("Content-Type", "application/javascript");
                    }
		    // Cache-Control
		    // TODO: make configurable
                    res.header('Expires', new Date((new Date()).getTime() + (60 * 60 * 1000 * 24 * 365 * 10)));
                    res.header('Age', '300');
                    res.header('Cache-Control', 'max-age=315360000');


                    res.header('Date', new Date());
                    res.send(ret);
                }
            });
        }
		
	};
};
