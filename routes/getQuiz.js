var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.db.all(`SELECT * FROM quiz WHERE id = ${req.params.quiz_id};`, [], (err, rows) => {
		if(err) {
			return res.send({
				"status": "failure",
				"reason": err
			});
		}
		if(rows.length == 0) {
			res.send({});
		}
		else {
			res.send(rows[0]);
		}
	});
});

module.exports = router;
