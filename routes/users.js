var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.params)
  res.send('respond with a resource');
});

module.exports = router;
