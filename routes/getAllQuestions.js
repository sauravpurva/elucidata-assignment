var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.db.all(`SELECT * FROM quiz WHERE id = ${req.params.quiz_id};`, [], (err, rows1) => {
		if(err) {
			return res.send({
				"status": "failure",
				"reason": err
			});
		}
		if(rows1.length == 0) {
			res.send({});
		}
		else {
			req.db.all(`SELECT * FROM question WHERE quiz_id = ${req.params.quiz_id};`, [], (err, rows2) => {
				if(err) {
					return res.send({
						"status": "failure",
						"reason": err
					});
				}

				res.send({
					"name": rows1[0].name,
					"description": rows1[0].description,
					"questions": rows2
				});
			});
		}
	});
});

module.exports = router;
