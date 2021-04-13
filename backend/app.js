const fs = require('fs');
const path = require('path');
const cors = require("cors");
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// Port that the webserver listens to
const PORT = process.env.PORT || 5000;

dotenv.config();

// Body Parser middleware to parse request bodies
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true,
    useFindAndModify: false, 
    useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT);
    console.log(`Server Running on port ${PORT}`);
  })
  .catch(err => {
    console.log("Connection failed!");
    console.log(err);
  });

    //deprecation warning
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);