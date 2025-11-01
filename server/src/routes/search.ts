import { Router } from 'express';
import { search } from '../services/elastic';
const router = Router();

router.get('/', async (req, res) => {
  const q = (req.query.q as string) || '';
  const results = await search(q);
  res.json(results);
});

export default router;
