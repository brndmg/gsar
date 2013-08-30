var contactSearchers = function() {
	var data = {
		"RescueListProvider": "D4H",
		"WhoIsOnCallList": [
			{
				"fullname": "The GMan",
				"phone": "5065551212"
			},
			{
				"fullname": "Matt",
				"phone": "5065551212"
			},
			{
				"fullname": "Michael",
				"phone": "5065551212"
			},
			{
				"fullname": "Evan",
				"phone": "5065551212"
			},
			{
				"fullname": "Nick",
				"phone": "5065551212"
			},
			{
				"fullname": "Leah",
				"phone": "5065551212"
			}
		]
	};	

	var client = require('twilio')('XXXXXXXXX', 'XXXXXXXXX');

	for (i=0; i < data.WhoIsOnCallList.length; i++) {
		console.log('--- ' + data.WhoIsOnCallList[i].fullname);
		// Use this convenient shorthand to send an SMS:
		client.sendSms({
			to: data.WhoIsOnCallList[i].phone,
			from:'+15068028606',
			body:'Some sort of emergency. Help out somehow...please?'
		}, function(error, message) {
			if (!error) {
				console.log('Success! The SID for this SMS message is:');
				console.log(message.sid);
		 
				console.log('Message sent on:');
				console.log(message.dateCreated);
			}
			else {
				console.log('Oops! There was an error.');
			}
		});
	}
};

var cancelSearch = function(cancel_message){
	var data = {
		"RescueListProvider": "D4H",
		"WhoIsOnCallList": [
			{
				"fullname": "The GMan",
				"phone": "5065551212"
			},
			{
				"fullname": "Matt",
				"phone": "5065551212"
			},
			{
				"fullname": "Michael",
				"phone": "5065551212"
			},
			{
				"fullname": "Evan",
				"phone": "5065551212"
			},
			{
				"fullname": "Nick",
				"phone": "5065551212"
			},
			{
				"fullname": "Leah",
				"phone": "5065551212"
			}
		]
	};		

	var client = require('twilio')('XXXXXXXXX', 'XXXXXXXXX');

	for (i=0; i < data.WhoIsOnCallList.length; i++) {
		console.log('--- ' + data.WhoIsOnCallList[i].fullname);
		// Use this convenient shorthand to send an SMS:
		client.sendSms({
			to: data.WhoIsOnCallList[i].phone,
			from:'+15068028606',
			body: 'UPDATE: ' + cancel_message 
		}, function(error, message) {
			if (!error) {
				console.log('Success! The SID for this SMS message is:');
				console.log(message.sid);
		 
				console.log('Message sent on:');
				console.log(message.dateCreated);
			}
			else {
				console.log('Oops! There was an error.');
			}
		});
	}
};

exports.contactSearchers = contactSearchers;
exports.cancelSearch = cancelSearch;