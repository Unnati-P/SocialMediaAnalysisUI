const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan')

const PORT = process.env.PORT;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});


app.listen(PORT || 5000, function () {
    console.log('Tasks app listening on port 3000!')
});
