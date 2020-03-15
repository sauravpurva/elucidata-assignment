var express = require('express');
var router = express.Router({ mergeParams: true });

/* GET users listing. */
router.post('/', function(req, res, next) {
	req.db.run('INSERT INTO quiz (name, description) VALUES(?, ?)', [req.body.name, req.body.description], function(err) {
		if(err) {
			return res.send({
				"status": "failure",
				"reason": err
			});
		}
		let query = `SELECT * FROM quiz WHERE id = ${this.lastID}`;
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
