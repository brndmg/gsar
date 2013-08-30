/*
 * GET home page.
 */
 
exports.index = function(req, res) {
	res.render('index', { title: 'Express' });
};


exports.testmongo = function(req, res){

	//var mongo = require('/whatyoucalledit');

	res.send('test');

};