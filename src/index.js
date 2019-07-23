
import cors from 'cors';
import 'dotenv/config';
import uuidv4 from 'uuid/v4';
import bodyParser from 'body-parser';
import express from 'express';
import models, { connectDb } from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
   req.context = {
      models,
      //  me: await models.User.findByLogin('Jake M'),
   };
   next();
});

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/points', routes.point);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Point.deleteMany({}),
    ]);

    createUsersWithPoints();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithPoints = async () => {
   const user1 = new models.User({
       username: 'Jake M',
       bio: 'Moon Points Commish'
   });

   const user2 = new models.User({
       username: 'Ben W',
       bio: 'Moon Points Founder'
   });

   const point1 = new models.Point({
      day: '6/23/19',
      pic: 'pic1',
      user: user1.id,
   });

   const point2 = new models.Point({
      day: '6/28/19',
      pic: 'pic2',
      user: user2.id,
   });

   const point3 = new models.Point({
      day: '7/14/19',
      pic: 'pic3',
      user: user2.id,
   });

   await user1.save();
   await user2.save();
   
   await point1.save();
   await point2.save();
   await point3.save();




};