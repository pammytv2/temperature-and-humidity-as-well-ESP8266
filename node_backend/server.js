const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/datebase');
const apiRoutes = require('./routes/api');


const app = express();
const port = 3000;



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});


