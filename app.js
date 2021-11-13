const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const secrets = require("./secrets");
const app = express();

mongoose
  .connect(secrets.MONGODB_URI, {
    useCreateIndex: true,
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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