// var fs = require('fs');
// var data = fs.readFileSync('./client/index.html');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var headers = defaultCorsHeaders;
var statusCode = 200;

console.log("hello there we are in request handler")
// headers['Content-Type'] = 'application/json';
/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/
var dataObj = {
 results: []
};

var requestHandler = function(request, response) {

    //If response method is GET
  if (request.method === 'GET' && request.url === '/classes/messages') {
    console.log("this is request url", request.url)
    //the request.url needs to be 'classes/messagese'

    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(dataObj));
    //Send a message back with the information that was asked for

  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    var data;
    request.on('data', function(chunk) {
      //binds data event to request object.
      //If data is sent,
      data = JSON.parse(chunk);
      //parse the chunk of data sent
      dataObj.results.push(data);
      //push the chunk of parsed data into results array
    });
    request.on('end', function() {
      //binds end event to request object
      //'end' is invoked only when all the data was consumed/no more data is provided
      response.writeHead(201, {'Content-Type': 'application/json'});
      //Sends a response header to the request
      response.end(JSON.stringify(dataObj));
      //stringify the object containing the results array when all of the response
      //headers and body have been sent
      //flushes the response's internal buffer and sends data to the client
    });
  } else if (request.method === 'OPTIONS' && request.url === '/classes/messages') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end();
  }
    else {
    response.writeHead(404, {'Content-Type': 'application/json'});
    //resource not found: 404 error
    response.end();
  }
};

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
