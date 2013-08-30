var gsardb = (function () {
    var MongoClient = require('mongodb').MongoClient;
    var connString = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/gsar';

    var createRequestDoc = function (rvPoint, desc) {
        return {description: desc, location: rvPoint, contacts: []};  
    };

    var saveRequest = function (doc, handleSave) {
        MongoClient.connect(connString, function (err, db) {
            if (err) {
                console.log('Error connecting to Mongo: ' + connString);
                handleSave(err, doc);
            }

            var collection = db.collection('gsar_incidents');

            collection.insert(doc, function(err, docs) {
                if (err) {
                    console.log('Error inserting document');
                    handleSave(err, doc);
                }

                // return the saved document
                handleSave(null, docs[0]);
            });

            db.close();
            });
    };

    var findLatestRequest = function (handleResults) {
        MongoClient.connect(connString, function (err, db) {
            if (err) {
                console.log('Error connecting to Mongo: ' + connString);
                handleResults(err, null);
            }

            console.log('before collection callback');
            
            db.collection('gsar_incidents', function(err, col) {
                console.log('in collection callback');
                if (err) {
                    console.log('Error finding latest incident');
                    throw err;
                }
                console.log('before find callback');
                col.find({}, { sort: {_id:-1}}).toArray(function (err, docs) {
                    if (err) {
                        console.log('Error in find callback');
                    }
                    console.log('in find callback');
                    handleResults(null, docs[0]);
                    db.close();
                });
            });

        });
    };

    var updateRequest = function (reqDoc, handleResults) {
        MongoClient.connect(connString, function (err, db) {
            if (err) {
                console.log('Error connecting to Mongo: ' + connString);
                handleResults(err, null);
            }
            db.collection('gsar_incidents', function(err, col) {
                col.update({_id: reqDoc._id}, reqDoc, function (err, result) {
                    console.log('Update callback!');
                    console.log(result);
                    handleResults(null, result);
                    db.close();
                });
            });
        });
    };

    return {
        createRequestDoc: createRequestDoc,
        saveRequest: saveRequest,
        findLatestRequest: findLatestRequest,
        updateRequest: updateRequest
    };

} ());

exports.gsardb = gsardb;

//var doc = gsardb.createRequestDoc("new", "new");
//gsardb.saveRequest(doc, function(err, doc) {
    //console.log('Saved:');
//});
//
//gsardb.findLatestRequest(function (err, latest) {
    //if (err) {
        //console.log('Error finding the latest!');
        //throw err;
    //}
    //latest['location'] = 'I am Here!';
    //latest['description'] = 'I am Here!';
    //gsardb.updateRequest(latest, function (err, result) {
        //console.log('Updated?' + result);
    //});
//});
//console.log('Ending execution');
