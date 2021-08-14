const path = require("path");
const express = require("express");
const app = express();

//list of routers
const cardRouters = require("./routes/cardRouter");
const authRouters = require("./routes/authRouter");

const PORT = 3000;
const { Pool } = require('pg');
const PGURI = 'postgres://qbcgrnmp:7eLZI0w8cwiAvGG9_qzoTTD0YSRp7_2D@chunee.db.elephantsql.com/qbcgrnmp';
const pool = new Pool({
  connectionString: PGURI,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/build", express.static(path.join(__dirname, "../build/")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

//route all card requests to the card router
app.use("/cards", cardRouters);

//route all authentication requests to the authentication router
app.use("/auth", authRouters);

//catch all route handler, handles request to an unknown route
app.use((req, res) => res.status(404).send("This page does not exist..."));

//gloabal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Global error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error was passed into the global error handler" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
