"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.add = exports.all = void 0;
const Todo_1 = require("../models/Todo");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield Todo_1.Todo.findAll();
        res.json({ list });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
exports.all = all;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.title) {
        res.status(400).json({ error: "'title' não enviado!" });
        return;
    }
    try {
        let newTodo = yield Todo_1.Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201).json({ item: newTodo });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let todo = yield Todo_1.Todo.findByPk(id);
        if (!todo) {
            res.status(404).json({ error: 'Item não encontrado!' });
            return;
        }
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }
        yield todo.save();
        res.json({ item: todo });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let todo = yield Todo_1.Todo.findByPk(id);
        if (!todo) {
            res.status(404).json({ error: 'Item não encontrado' });
            return;
        }
        yield todo.destroy();
        res.json({});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
exports.remove = remove;
