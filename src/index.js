
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

app.use((req, res, next) => {
   req.context = {
      models,
      me: models.users[1],
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
      models.Message.deleteMany({}),
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});

const createUsersWithMessages = async () => {
   
};