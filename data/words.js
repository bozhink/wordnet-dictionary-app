function WordDAO(db, collectionName) {
    'use strict';
    
    var collection = db.collection(collectionName);
    
    this.searchText = function (text, callback) {
        collection.find({
            '$text': {
                '$search': text
            }
        }).sort({
            'word': 1
        }).toArray(function (err, words) {
            if (!!err) {
                callback(err, []);
            } else {
                callback(null, words);
            }
        });
    }
}

module.exports.WordDAO = WordDAO;
