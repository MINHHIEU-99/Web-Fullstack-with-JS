const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        // Cách nodejs đọc data từ form request: vì nodejs k biết được req là phức tạp hay k nên data sẽ được chia nhỏ ra và parse theo từng phần(chunk), sau đó sẽ được lưu vào thứ gọi là buffer
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk); // khi khai báo 1 biến là const thì ta k thể thay đổi bằng cách đặt body = ..., phương thức push chỉ thay đổi giá trị đằng sau của biến
                            // chứ k thay đổi biến đó nên k bị sai logic.
        });
    
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
    
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;
