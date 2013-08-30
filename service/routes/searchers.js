// use the database module to get the list of searchers and their statuses
var mongo = require('mongodb');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var mongo_url = process.env.MONGOLAB_URI || 'ds041238.mongolab.com';
var user = process.env.MONGOLAB_USER || 'user';
var password = process.env.MONGOLAB_PASSWORD || 'pass';

var server = new Server(mongo_url, 41238, {auto_reconnect: true});
db = new Db('gsar', server, {safe:false});
 
db.open(function(err, client) {
	if (!err) {
		client.authenticate(user, password, function(err, success) {
			console.log("Connected to 'gsar' database on MongoLab");
			db.collection('gsar_incidents', {strict:true}, function(err, collection) {
				if (err) {
					console.log("The 'gsar_incidents' collection doesn't exist." + err);
				} else {
					collection.count( function(err, count) {
						console.log('Collection has ' + count + ' documents');
					});
				}
			});
			
		});
	} 
});

exports.findAll = function(req, res) {
	console.log('Server: findAll route');
    db.collection('gsar_incidents', function(err, collection) {
        collection.find().toArray(function(err, items) {
        	if (!err) {
            	res.send(items);
            } else {
            	res.send({ "error": "Could not find items"});
            }
        });
    });
};
	
	
exports.status = function(req, res) {
		
	res.send({ success: 'true' });
};

exports.update = function(req, res) {
	
	console.log('------- update!');
	var stuff = req.body;
	var phoneNumber = stuff.To;
	var response = stuff.Body;
	
	db.collection('gsar_incidents', function(err, collection) {
        collection.update({'phone':phoneNumber}, {$set: {"response" : response}}, {safe:true}, function(err) {
        	if (!err) {
        		console.log('Updated user.');
        		res.send("Success");
        	} else {
        		res.send(err.message);
        	}
        });
    });
	
	res.send(stuff);
};
