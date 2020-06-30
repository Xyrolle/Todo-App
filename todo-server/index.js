const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());

let db = new sqlite3.Database('./todo.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) console.error(err.message);
	else console.log('connected to database');
});

app.get('/', (req, res) => {
	return res.send('base/');
});

// add todo
app.get('/add/todo', (req, res) => {
	const { title, description, priority, category } = req.query;
	const date = new Date();
	const ADD_TODO = `INSERT INTO Todos (title, description, createdAt, updatedAt, priority, category) VALUES('${title}', '${description}', '${date}', '${date}', '${priority}', '${category}')`;
	db.all(ADD_TODO, (err, rows) => {
		if (err) console.error(err);
		res.send(rows);
	});
});

// delete todo
app.get('/delete/todo/:id', (req, res) => {
	const id = req.params.id;
	const DELETE_TODO = `DELETE FROM Todos WHERE id=?`;
	db.run(DELETE_TODO, id, (err) => {
		if (err) console.error('error while deleting', err);
	});
});

app.get('/update/todo/:id', (req, res) => {
	const id = req.params.id;
});

// todos for category
app.get('/todos/:category', (req, res) => {
	const category = req.params.category;
	const SELECT_ALL_TODOS = `SELECT * FROM Todos WHERE category='${category}'`;
	db.all(SELECT_ALL_TODOS, (err, rows) => {
		if (err) console.error(err);
		res.send(rows);
	});
});

// all todos
app.get('/todos/', (req, res) => {
	// ?sort[priority]=asc&filter[priority]=1,2,3
	const { like } = req.query;
	const SELECT_ALL_TODOS = `SELECT * FROM Todos WHERE title LIKE 'hoo%'`;
	db.all(SELECT_ALL_TODOS, (err, rows) => {
		if (err) console.error(err);
		res.send(rows);
	});
});

app.get('/add/category/', (req, res) => {
	const { name } = req.query;
	const ADD_CATEGORY = `INSERT INTO Categories (name) VALUES('${name}')`;
	db.all(ADD_CATEGORY, (err, rows) => {
		if (err) console.error('error while addding category', err);
	});
});

app.get('/categories', (req, res) => {
	const SELECT_ALL_CATEGORIES = 'SELECT * FROM Categories';
	db.all(SELECT_ALL_CATEGORIES, (err, rows) => {
		if (err) console.error(err);
		res.send(rows);
	});
});

app.get('/sort', (req, res) => {
	const SORTED_TABLE =
		'CREATE TABLE ORDERED_TODOS (id INTEGER PRIMARY KEY, title TEXT, description TEXT, createdAt TEXT, updatedAt TEXT, priority INTEGER, category TEXT)';
	const INSERT_INTO_SORTED_TABLE = `INSERT INTO ORDERED_TODOS (id, title, description, createdAt, updatedAt, priority, category) SELECT id, title, description, createdAt, updatedAt, priority, category FROM Todos ORDER BY priority`;
	const DROP_TODOS = 'DROP TABLE Todos';
	const RENAME_TABLE = 'ALTER TABLE ORDERED_TODOS RENAME TO Todos';

	db.run(SORTED_TABLE, (rows, err) => {
		if (err) console.error(err);
		else res.send('success');
		db.run(INSERT_INTO_SORTED_TABLE, (rows, err) => {
			db.run(DROP_TODOS, (rows, err) => {
				db.run(RENAME_TABLE);
			});
		});
	});
});

app.listen(4000, () => {
	console.log('listening on port 4000');
});
