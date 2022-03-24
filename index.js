const port = process.env.PORT || 3000;
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_Connection, { useNewUrlParser: true }, () =>
  console.log("Connected to DB")
);

const user = require("./routes/user");
const comments = require("./routes/comments");
const likes = require("./routes/likes");
const grades = require("./routes/grades");

app.use(express.json());

app.use(cors());
app.options('*', cors())

app.use("/users", user);
app.use("/comments", comments);
app.use("/likes", likes);
app.use("/grades",grades)

app.listen(port, () => console.log(`App is running on port ${port}!!!`));
