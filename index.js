const http = require('http');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Hello world!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server is running at htttp://${hostname}:${port}`);
});