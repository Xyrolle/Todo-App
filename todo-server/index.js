const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());

// table with todos, each todo has a primary key (id) and foreign key
// each todo can be referenced from category
// SELECT ALL Todos WHERE foreign_key=category_id

let db = new sqlite3.Database('./todo.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		console.error(err.message);
	} else {
		console.log('connected to database');
	}
});

app.get('/', (req, res) => {
	return res.send('base /');
});

app.get('/addTodo', (req, res) => {
	const { title, description } = req.query;
	const date = new Date();
	const INSERT_INTO_DECK_INFO = `INSERT INTO Todos (title, description, createdAt, updatedAt) VALUES('${title}', '${description}', '${date}', '${date}')`;
	const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS Todos (id INTEGER PRIMARY KEY, title text, description text,createdAt date, updatedAt date, priority INTEGER DEFAULT 1, complete BOOL DEFAULT 0)`;
	db.run(CREATE_TABLE, (err) => {
		if (err) console.error('cannot create a todo');
	});
	db.all(INSERT_INTO_DECK_INFO, (err, rows) => {
		if (err) console.error(err);
		res.send(rows);
	});
});

app.get('/removeTodo/:id', (req, res) => {
	const id = req.params.id;
	db.run(`DELETE FROM Todos WHERE id=?`, id, (err) => {
		if (err) console.error('error while deleting');
	});
});

app.get('/todos', (req, res) => {
	db.all('SELECT * FROM Todos', (err, rows) => {
		if (err) console.error('error while showing all todos');
		res.send(rows);
	});
});

app.listen(4000, () => {
	console.log('listening on port 4000');
});
