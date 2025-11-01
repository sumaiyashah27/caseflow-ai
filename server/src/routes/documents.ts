import { Router } from 'express';
import { pool } from '../services/db';
import { indexDocument } from '../services/elastic';
import { analyzeText } from '../services/openai';

const router = Router();

router.get('/', async (_req, res) => {
  const { rows } = await pool.query('SELECT id, title, status, case_id FROM documents ORDER BY id DESC LIMIT 50');
  res.json(rows);
});

router.post('/', async (req, res) => {
  const { title, content, caseId } = req.body;
  if (!title || !content) return res.status(400).json({ error: 'title and content required' });
  const ai = await analyzeText(content);
  const status = ai.classification || 'unclassified';
  const { rows } = await pool.query(
    'INSERT INTO documents (title, content, status, case_id) VALUES ($1,$2,$3,$4) RETURNING id, title, status, case_id',
    [title, content, status, caseId || null]
  );
  await indexDocument({ id: rows[0].id, title, content, status, case_id: caseId });
  res.status(201).json(rows[0]);
});

export default router;
