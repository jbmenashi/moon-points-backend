import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.points));
});

router.get('/:pointId', (req, res) => {
  return res.send(req.context.models.points[req.params.pointId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const point = {
    id,
    day: req.body.day,
    pic: req.body.pic,
    userId: req.context.me.id,
  };

  req.context.models.points[id] = point;

  return res.send(point);
});

router.delete('/:pointId', (req, res) => {
  const {
    [req.params.pointId]: point,
    ...otherpoints
  } = req.context.models.points;

  req.context.models.points = otherpoints;

  return res.send(point);
});

export default router;