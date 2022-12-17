//============================
// DEPENDENCIES
//============================
const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();

//============================
// ROUTES
//============================
/**
 * VIEW: home
 */
router.get('/', (req, res) => {
    Todo.getAll((err, data) => {
        if (err) throw err;

        const completedTodos = data.filter(todo => todo.done);
        const incompleteTodos = data.filter(todo => !todo.done);

        res.render('index', {
            completedTodos,
            incompleteTodos
        });
    });
});

/**
 * API: all todos
 */
router.get('/todos', (req, res) => {
    Todo.getAll((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

/**
 * API: add todo
 */
router.post('/todos', (req, res) => {
    if (req.body.task.trim() === '') {
        res.statusMessage = 'field is empty';
        return res.status(400).end();
    }

    Todo.add(req.body, (err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});


router.put('/todos', (req, res) => {
    Todo.update(req.body, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});


router.delete('/todos', (req, res) => {
    Todo.delete(req.body.id, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;