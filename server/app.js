const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://testuser:test123@vcluster-shard-00-00-zyixk.mongodb.net:27017,vcluster-shard-00-01-zyixk.mongodb.net:27017,vcluster-shard-00-02-zyixk.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Vcluster-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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
