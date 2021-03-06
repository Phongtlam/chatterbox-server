/*************************************************************
You should implement your request handler function in this file.
requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.
You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.
*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
**************************************************************/

var messages = {
  results: []
}
var requestHandler = function(request, response) {
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  var headers = defaultCorsHeaders;
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
  // var pt = path.join(__dirname, "..","/client","/index.html" )
  // console.log('dir is ' + __dirname );
  // console.log('pt is ' + pt);
  // console.log('filename is ' + __filename);


  // The outgoing status.
  var statusCode;

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  if (request.method === 'OPTIONS') {
    statusCode=200;
    //response.writeHead(200, headers);
    //response.end(JSON.stringify(messages));
  }

  //our crazy code
  if (request.method === 'POST' && request.url === '/classes/messages') {
    statusCode=201;
    request.on('data', function(data) {
      var message= JSON.parse(data); 
      messages.results.push(message);
      // var messagesToSend= JSON.stringify(messages);
      // console.log(JSON.parse(messagesToSend).results[0].username)
      console.log('THIS IS POST' + JSON.stringify(message))
    });
    
    //     body += message;
    //     if(body.length > 1e6){
    //       request.connection.destroy();
    //     }
    // })
    // request.on("end",function(){
    // })
      
    // request.on('end', function(){
    //   response.end();
    //   done();
    // })
  } 
  if (request.method === 'GET' && request.url === '/classes/messages') {
    statusCode=200;
    //response.writeHead(200, headers);
      //data will be a application/json
      //console.log("get" + JSON.stringify(messages))
    //response.end(JSON.stringify(messages));
    console.log('THIS IS GET' )
  } 
      //data = JSON.parse(data)
      //response.end('in classes/messages');
   
    // console.log('request is ' + JSON.parse(request));
    // messages.results.push(JSON.stringify(request.body));
    // var lastMessage = messages.results.slice(-1);
    // response.end(JSON.stringify(lastMessage.username));
  if (request.url !== '/classes/messages') {
    statusCode=404;
    //response.writeHead(404, headers); 
    //response.end(JSON.stringify(messages));
  }
  // var newMessage = messages.results.slice(-1);
  // var sendBack = JSON.stringify(newMessage);
  //console.log(JSON.parse(messages));   




  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  //response.end('Hello, World!');
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(messages));
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;