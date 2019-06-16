const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Polaczono z baza danych");
}).catch(err => {
    console.log('Brak połaczenia', err);
    process.exit();
});

app.get('/',(req, res) => {

    res.json({"message": "Strona z notatkami"});
});

require('./app/note.routes.js')(app);
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Serwer dziala ");
});
