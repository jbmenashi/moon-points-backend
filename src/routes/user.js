import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
   const users = await req.context.models.User.find();
   return res.send(users);
});

router.get('/:userId', async (req, res) => {
   const user = await req.context.models.User.findById(
      req.params.userId,
   );
   return res.send(user);
});

router.post('/', async (req, res) => {
   const user = await req.context.models.User.create({
      username: req.body.username,
      bio: req.body.bio
   });

   return res.send(user);
});

export default router;