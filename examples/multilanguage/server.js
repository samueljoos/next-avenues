const next = require('next');
const http = require('http');
const router = require('./routes');
const port = 3333;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handleNextRequests = router.getRequestHandler(app);

app.prepare().then(() => {
    const server = new http.Server((req, res) => {
        app.setAssetPrefix('');
        return handleNextRequests(req, res);
    });

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`> Ready on http://localhost:${port}`);
    });
});
