var express = require('express');

module.exports = function (db) {
    'use strict';
    
    var router = express.Router();

    router.get('/', function(req, res) {
        'use strict';
        res.render('home');
    });


    router.post('/', function(req, res) {
        'use strict';

        var text = req.body['search-text'];

        res.render('response', {});
        // items.addReview(itemId, review, name, stars, function(itemDoc) {
        //     res.redirect('/item/' + itemId);
        // });
    });

    return router;
};