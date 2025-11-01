import { Router } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../services/db';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, email, password_hash, role FROM users WHERE email=$1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } finally {
    client.release();
  }
});

export default router;
