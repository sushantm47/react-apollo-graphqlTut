const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv/config');

const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_Connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(' MongoDB Connected 👻!!');
  })
  .catch((e) => {
    console.log('Errorr 👺');
    console.log(e);
  });

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
