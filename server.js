const app = require('./app');
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Website running at http://localhost:${port}`));
