var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.post('/', function(req, res, next) {
	req.db.run('INSERT INTO question (name, options, correct_option, points, quiz_id) VALUES(?, ?, ?, ?, ?);', [req.body.name, req.body.options, req.body.correct_option, req.body.points, req.body.quiz], function(err) {
		if(err) {
			return res.send({
				"status": "failure",
				"reason": err
			});
		}
		let query = `SELECT * FROM question WHERE id = ${this.lastID}`;
		req.db.all(query, [], (err, rows) => {
			if(err) {
				return res.send({
					"status": "failure",
					"reason": err
				});
			}
			res.send(rows[0]);
		})
	})	
});

module.exports = router;
