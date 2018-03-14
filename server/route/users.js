module.exports = (app, db) => {

  const UserModel = require('../models/user');
  const { ObjectId } = require('mongodb');

  const userModel = new UserModel(db, ObjectId);

  app.post('/loginWithPass', (req, res) => {
    res.send(req.body);
  });

  app.post('/signup', (req, res) => {
    let userID = userModel.insertUser({ name: "test", email: "test@gmail.com" });
    res.send(userID);
  });
}