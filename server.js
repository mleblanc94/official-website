const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html');
    response.end('<h1>There wasnt supposed to be there you stupid ****</h1>')
})

server.listen(3000);