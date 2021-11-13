const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const secrets = require("./secrets");

const logger = require("morgan");

const initFetchVideoJob = require("./fetchcron");
const indexRouter = require("./index");

const app = express();

mongoose
  .connect(secrets.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Connected to mongodb
  })
  .catch((err) => {
    if (err) {
      console.log(`Failed to connect to MongoDB: ${err}`);
    }
  });

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  
  app.use("/", indexRouter);
  
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

// Error handler
app.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // Render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  
  initFetchVideoJob();
  
  module.exports = app;