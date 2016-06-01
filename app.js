var app, express = require('express'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    config = require('./config/config');

// Set up express
app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

MongoClient.connect(config.connectionString, function(err, db) {
    'use strict';

    assert.equal(null, err);
    console.log('Successfully connected to MongoDB.');

    var router = require('./routers/defaultRouter')(db, config.collectionName);

    app.use('/', router);

    // Start the server listening
    var server = app.listen(3000, function() {
        var port = server.address().port;
        console.log('Dictionary app is listening on http://localhost:%s', port);
    });

});