var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};


function send404(response)
{
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error: 404 Resource not found');
    response.end();
}

function serveStatic(response, cache, absPath)
{
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    } else {

        fs.exists(absPath, function(exists)
                  {
                      if (exists)
                      {
                          fs.readFile(absPath, function (err, data) {
                              if (err) {
                                  send404(response);
                              } else {
                                  cache[absPath] = data;
                                  sendFile(response, absPath, data);
                              }
                          });
              
                      } else {
                          send404(response);
                      }
                  });
    }                                                 
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(
                200,
                {"content-type": mime.lookup(path.basename(filePath))}
        );

    response.end(fileContents);
}

var server = http.createServer(function (request, response) {
    var filePath = false;
    
    if (request.url == '/') {
        filePath = 'index.html';
    } else {
        filePath = '' + request.url;
    }

    var absPath = "./" + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
    console.log('Server is listening on port 3000');
});



                               
