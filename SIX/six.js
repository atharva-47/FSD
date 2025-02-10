const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.end(`
            <form method="POST">
                <input type="text" name="file1" placeholder="First File"><br>
                <input type="text" name="file2" placeholder="Second File"><br>
                <button type="submit">Append</button>
            </form>
        `);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const params = querystring.parse(body);
            const file1 = params.file1;
            const file2 = params.file2;
            
            fs.readFile(file1, 'utf8', (err, data) => {
                if (err) return res.end(`Error reading ${file1}`);
                fs.appendFile(file2, data, err => {
                    if (err) return res.end(`Error writing to ${file2}`);
                    res.end(`Appended ${file1} to ${file2}`);
                });
            });
        });
    }
});

server.listen(3000, () => console.log('Server running at http://localhost:3000'));
