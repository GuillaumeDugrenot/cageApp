'use strict';

let express = require('express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname + '/app')));

app.listen(9191, () => {
    console.log('Listening on 9191');
});
