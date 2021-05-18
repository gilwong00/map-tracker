import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

const initServer = async () => {
  const app = express();

  app.use(express.json());

  mongoose
    .connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: process.env.NODE_ENV !== 'production'
    })
    .catch(err => console.log(`Error connecting to mongo: ${err.message}`));

  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

initServer().catch(err =>
  console.log(`Erroring starting server: \n ${JSON.stringify(err, null, 2)}`)
);
