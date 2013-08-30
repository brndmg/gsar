exports.execute = function(req, res){
	var s = require('./../searchers/searchers');
	
	var message = 'Please use a POST to initiate';
	
	if (req.method == 'POST') {
		message = req.body.message;
		var password = req.body.password;
		var rendevous = req.body.rendevous;
		var rtime = req.body.time;
		
		if(password == 'peihacks'){
			s.contactSearchers();
	  		res.send({'status': true});
	  	}else
	  	{
	  		res.send({'status': false});
	  	}

  	}

};


exports.cancel = function(req, res){
	var s = require('./../searchers/searchers');
	
	var message = 'Please use a POST to initiate';
	
	if (req.method == 'POST') {
		message = req.body.message;
		var password = req.body.password;
		
		if(password == 'peihacks'){
			s.cancelSearch(message);
	  		res.send({'status': true});
	  	}else
	  	{
	  		res.send({'status': false});
	  	}
  	}

};
