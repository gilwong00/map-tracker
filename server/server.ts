import 'dotenv-safe/config';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes';

const PORT: number = +(process.env.PORT || 5000);

const initServer = (): void => {
  try {
    const app: Express = express();

    app.use(cors());
    app.use(express.json());
    app.use('/api', router);

    mongoose
      .connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: process.env.NODE_ENV !== 'production'
      })
      .catch(err => console.log(`Error connecting to mongo: ${err.message}`));

    mongoose.connection.on('connected', () => {
      console.log('Connected to mongo');
      app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    });

    mongoose.connection.on('err', err => {
      console.error('Error connecting to mongo', err);
      process.exit(1);
    });
  } catch (err) {
    console.log(`Erroring starting server: \n ${JSON.stringify(err, null, 2)}`);
  }
};

initServer();
