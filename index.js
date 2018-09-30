var express = require('express');
var router = express.Router();
var debug = require('debug')('hookhub-hook-dump');

debug("Loading");

// Get payload
router.use('/', function (req, res, next) {
	if (req.method == 'GET') {
		res.locals.payload = req.query;
	} else if (req.method == 'POST') {
		debug("Request Body:");
		debug(req.body);
		if (req.headers['content-type'].indexOf('application/json') && typeof req.body != 'object') {
			debug("Converting to JSON");
			res.locals.payload = JSON.parse(req.body);
		} else {
			res.locals.payload = req.body;
		}
	}
	next();
});

/* Default handler. */
router.use('/', function(req, res, next) {
	debug("Handling default request");
	
	console.log("hookhub-hook-dump - payload:");
	console.log(res.locals.payload);

  res.send({result:"OK",ts:Date.now(),message:"Data Dumped"});
});

module.exports = router;
