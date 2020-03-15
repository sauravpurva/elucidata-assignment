var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
	if(err) {
		console.log(err);
	}
	else {
		db.get("PRAGMA foreign_keys = ON");
		db.run(`
			CREATE TABLE quiz (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name text,
			description text
			)`, (err) => {
				if(err) {
					console.log(err);
				}
				else {
					db.run(`
						CREATE TABLE question (
							id INTEGER PRIMARY KEY AUTOINCREMENT,
							name text,
							options text,
							correct_option INTEGER,
							points INTEGER,
							quiz_id INTEGER REFERENCES quiz (id)
						)`, err => {
							if(err) {
								console.log(err);
							}
						}
					)
				}
			}
		)
	}
})

module.exports = db;