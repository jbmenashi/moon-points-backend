import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const points = await req.context.models.point.find();
  return res.send(points);
});

router.get('/:pointId', async (req, res) => {
  const point = await req.context.models.point.findById(
    req.params.pointId,
  );
  return res.send(point);
});

router.post('/', async (req, res) => {
  const point = await req.context.models.point.create({
    text: req.body.text,
    user: req.context.me.id,
  });

  return res.send(point);
});

router.delete('/:pointId', async (req, res) => {
  const point = await req.context.models.point.findById(
    req.params.pointId,
  );

  let result = null;
  if (point) {
    result = await point.remove();
  }

  return res.send(result);
});

export default router;