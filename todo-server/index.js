const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());

// table with todos, each todo has a primary key (id) and foreign key
// each todo can be referenced from category
// SELECT ALL Todos WHERE foreign_key=category_id

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
	const SELECT_ALL_TODOS = 'SELECT * FROM Todos';
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

app.listen(4000, () => {
	console.log('listening on port 4000');
});
