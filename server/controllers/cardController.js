const db = require("../cardModel.js");
//console.log("db", db);

const cardController = {};

cardController.getSet = (req, res, next) => {
  //_id comes from front end based on what set user clicked
  const setId = [req.body._id];
  //console.log(setId, "Should be 1");
  const queryString = `SELECT c.* FROM cards c WHERE c.set_id = $1;`;
  db.query(queryString, setId)
    .then((data) => {
      res.locals.set = data.rows;
      //console.log(res.locals.set, "Should be the object we want");
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

cardController.createSet = (req, res, next) => {
  //user sends a name for the set
  const setName = [req.body.name];
  //take name from request body and use that to create new set
  const queryString = `INSERT INTO sets (setname, private) VALUES ($1, '0');`;
  //Will need to pass setname and private = 0 to db
  db.query(queryString, setName)
    .then((data) => {
      res.locals.newSetName = setName;
      //console.log(res.locals.newSetName)
      return next();
    })
    .catch((err) => {
      console.log("error in create set middleware", err);
      return next(err);
    });
};

cardController.getSetByName = (req, res, next) => {
  const setName = res.locals.newSetName; //is an array already
  const queryString = `SELECT sets._id FROM sets WHERE sets.setname = $1;`;

  db.query(queryString, setName)
    .then((data) => {
      res.locals.setId = data.rows;
      return next();
    })
    .catch((err) => {
      console.log("error in getSetByName middleware", err);
      return next(err);
    });
};

cardController.createCard = (req, res, next) => {
  //USER SENDS: question, imageurl, answer, FOR NOW HARDCODE TO 1: difficulty, SENT FROM FRONT-END BASED ON SET USER IS IN: set_id
  const cardData = [
    req.body.question,
    req.body.imageurl,
    req.body.answer,
    1,
    req.body.set_id,
  ];

  const queryString = `INSERT INTO cards (question, imageurl, answer, difficulty, set_id) VALUES ($1, $2, $3, $4, $5);`;

  db.query(queryString, cardData)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.log("error in create card middleware", err);
      return next(err);
    });
};

cardController.getAllSets = (req, res, next) => {
  const queryString = `SELECT * FROM sets;`;
  db.query(queryString)
    .then((data) => {
      res.locals.allSets = data.rows;
      return next();
    })
    .catch((err) => {
      console.log("error in get all sets middleware", err);
      return next(err);
    });
};

module.exports = cardController;
