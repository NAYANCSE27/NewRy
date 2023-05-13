const express = require('express');
const dbconnect = require('./dbconnect');
const app = express();
const newsRoute = require('./routes/newsRoute');
const port = 5000;

app.use('/api/newsitems', newsRoute);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));