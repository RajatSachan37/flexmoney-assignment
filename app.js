const mongoose = require("mongoose");
const express = require("express");

const app = express();

const router = require("./routes/routes");
app.use("/", router);

// Connection to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect("<DB_CONNECTION_STRING>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.listen(3000, process.env.IP, () => {
  console.log("App is running on port: 3000");
});
