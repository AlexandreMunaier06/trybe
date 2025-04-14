const express = require('express');
const taskBD = require('../db/tasksDB');

const router = express.Router();

router.post('/', async (req, res) => {
  const task = req.body;
  try {
    const [result] = await taskBD.insert(task);
    res.status(201).json({ message: `Tarefa criada com id ${result.insertId}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: sqlMessage });
  }
});

router.put('/:id', async (req, res) => {
  const task = req.body;
  const { id } = req.params;
  try {
    const [result] = await taskBD.update(task, id);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: sqlMessage });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await taskBD.remove(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: sqlMessage });
  }
});

router.get('/', async (_req, res) => {
  try {
    const [result] = await taskBD.findAll();
    res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await taskBD.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;
