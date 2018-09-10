var http = require('https');

function getCall(options,callback){
    var reqGet = http.request(options, function (res) {
        var data = '';
        trace.info('API Call details: ' + JSON.stringify(options));
        //the listener that handles the response chunks
        res.addListener('data', function (chunk) {
            data += chunk.toString();
        });
        res.addListener('end', function (err, result) {
            if (err) {
                return callback(err);
            }

            else {
                try {
                    return callback( null,JSON.parse(data));
                }
                catch (e) {
                    console.log(e.message+ data);
                    return callback(e.message);
                }
            }
        });
    });

    reqGet.end();
    reqGet.on('error', function (e) {
        trace.error(e);
        return callback(e);
    });
}


function postCall(optionspost,body,callback){
  
        var reqPost = http.request(optionspost, function (res) {
            var data = '';
            trace.debug('API request body : ' + body);
            trace.info('API Call details: ' + JSON.stringify(optionspost));
            //the listener that handles the response chunks
            res.addListener('data', function (chunk) {
                data += chunk.toString();
            });
            res.addListener('end', function (err, result) {
                if (err) {
                    return callback(err);
                }

                else {
                    try {
                        //trace.info(JSON.stringify(data));
                        return callback(null,JSON.parse(data));
                    }
                    catch (e) {
                      
                        return callback(e.message);

                    }
                }
            });
        });
        if (body != '') {
            reqPost.write(body);
        }
        reqPost.end();
        reqPost.on('error', function (e) {
            trace.error(e);
            return reject(e);
        });
  
}




exports.getCall = getCall ;
exports.postCall = postCall ;