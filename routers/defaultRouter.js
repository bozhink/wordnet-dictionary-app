var express = require('express')
    WordDAO = require('../data/words').WordDAO;

module.exports = function (db, collectionName) {
    'use strict';
    
    var router = express.Router();
    var words = new WordDAO(db, collectionName);

    router.get('/', function(req, res) {
        'use strict';
        res.render('home');
    });


    router.post('/', function(req, res) {
        'use strict';

        var text = req.body['search-text'];

        words.searchText(text, function (err, words) {
            if (!!err) {
                res.render('error', { err: err });
            } else {
                res.render('response', { text: text, words: words });
            }
        });
    });

    return router;
};