// import express
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const db = require('./config/database');
// Settings server port
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
// Middlewares
app.use(express.json());

// Configure headers and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
  
// force: true will drop the table if it already exists
// db.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
// });
db.sync().then(() => {
    console.log('Database Syncing start');
});
// importing route employeeRoutes
const employeeRouter = require('./routes/employeeRoutes');

// Routes
app.use('/employee', employeeRouter);

app.use('/test', (req, res) => {
    res.send('Test route');
});

app.use('/', (req, res) => {
    console.log('Requested url: ', req.originalUrl)
    res.send('Hello World! from NodeJs Express.');
});


app.use(express.static("public"));

app.listen(app.get('port'), () => {
    console.log('Server starting on port ', app.get('port'));
});
