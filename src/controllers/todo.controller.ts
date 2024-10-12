import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const all = async (req: Request, res: Response) => {

    try {
        const list = await Todo.findAll();
        res.json({ list });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }

}

export const add = async (req: Request, res: Response) => {

    if (!req.body.title) {
        res.status(400).json({ error: "'title' não enviado!" });
        return;
      }
    
      try {
        let newTodo = await Todo.create({
          title: req.body.title,
          done: req.body.done ? true : false
        });
        res.status(201).json({ item: newTodo });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro interno do servidor.' });
      }

}

export const update = async (req: Request, res: Response) => {

    let id: string = req.params.id;

  try {
    let todo = await Todo.findByPk(id);
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

    await todo.save();
    res.json({ item: todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }

}

export const remove = async (req: Request, res: Response) => {

    let id: string = req.params.id;

  try {
    let todo = await Todo.findByPk(id);
    if (!todo) {
      res.status(404).json({ error: 'Item não encontrado' });
      return;
    }

    await todo.destroy();
    res.json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }

}