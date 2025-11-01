import { Router } from 'express';
import { pool } from '../services/db';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, name, status FROM cases ORDER BY id DESC');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { name, status } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const { rows } = await pool.query('INSERT INTO cases (name, status) VALUES ($1,$2) RETURNING id, name, status', [name, status || 'open']);
  res.status(201).json(rows[0]);
});

export default router;
