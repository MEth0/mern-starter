const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cookies = require('cookies');

const app = express();
const router = express.Router();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookies.express([config.get('jwtSecret')]))

const port = config.get('expressPort');
const db = config.get('mongoURI');

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

router.use('/auth', require('./routes/AuthRoutes'));
router.use('/users', require('./routes/UsersRoutes'));

app.use('/api', router);

app.listen(port, () => console.log(`Started on http://localhost:${port}`));
