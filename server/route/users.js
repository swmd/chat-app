module.exports = (app, db, appConfig) => {

  const UserModel = require('../models/user');
  const { ObjectId } = require('mongodb');
  const { hashSync, compareSync, genSaltSync } = require('bcrypt-nodejs');
  var nodemailer = require('nodemailer');
  const { randomBytes } = require('crypto');
  const fs = require('fs');
  const _ = require('underscore');

  const SALT_ROUNDS = 10;

  const userModel = new UserModel(db, ObjectId);

  const getUserByEmail = async (value) => {
    return await userModel.getUserByEmail(value);
  };

  const getUserByUserName = async (value) => {
    return await userModel.getUserByUserName(value);
  }

  const hash = (pass) => {
    return hashSync(pass, genSaltSync(SALT_ROUNDS));
  }

  const randomToken = () => {
    return randomBytes(43).toString('hex');
  }

  const getHtml = (templateName, data) => {

    const path = require('path');

    let templatePath = path.join(process.cwd(), `/public/emails/${templateName}.html`);
    let templateContent = fs.readFileSync(templatePath, 'utf8');

    return _.template(templateContent, data, {
      interpolate: /\{\{(.+?)\}\}/g
    });
  };

  const sendMailer = (to, subject, template, data) => {

    var transporter = nodemailer.createTransport(appConfig.emailer.transport);
    const mailOptions = { from: appConfig.emailer.from, to: to, subject: subject, html: getHtml(template, data) };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
  }

  app.post('/loginWithPass', (req, res) => {

    const { email, pass } = req.body;

    return getUserByEmail(email).then(user => {

      if (!user) return res.send({ error: "User Not Found!" });

      if (!compareSync(pass, user.pass)) return res.send({ error: "Incorrect password!" });

      if (!user.verified) return res.send({ error: "Not verified user!" })

      const { _id, userName, birthday } = user;

      return res.send({ user: { _id, userName, birthday } });

    });
  });

  app.post('/signup', (req, res) => {

    const userInfo = req.body;

    return getUserByEmail(userInfo.email).then(user => {
      if (user) {
        return res.send({ error: 'This email is already registered.' });
      }
      return getUserByUserName(userInfo.userName).then(user => {

        if (user) {
          return res.send({ error: 'This user name is already registered!' });
        }

        delete userInfo.confirmPass;
        userInfo.pass = hash(userInfo.pass);
        let verificationToken = randomToken();
        userInfo.verificationToken = verificationToken;

        userModel.insertUser(userInfo).then(_id => {
          sendMailer(userInfo.email, "Verification Your Account!", "verify", { verification_url: `${appConfig.originUrl}/verify/${verificationToken}/${_id}` })
          return res.send({ verify: false });
        });
      });
    });
  });

  app.post('/checkUserName', (req, res) => {
    return getUserByUserName(req.body.userName)
      .then(user => {
        if (user) res.send({ exist: true });
        else res.send({ exist: false });
      })
  });

  app.post('/checkEmail', (req, res) => {
    return getUserByEmail(req.body.email)
      .then(user => {
        if (user) res.send({ exist: true });
        else res.send({ exist: false });
      })
  })

  app.post('/verify', (req, res) => {

    userModel.getUserById(req.body.id)
      .then(user => {
        if (!user) return res.send({ error: "User not registered!" });
        if (user.verificationToken != req.body.token) return res.send({ error: "Invalid Token! or used already!" });
        userModel.updateUser(req.body.id, { verified: true, verificationToken: null })
          .then(() => {
            return res.send({ success: true });
          });
      });
  });

  app.post('/getUserList', (req, res) => {
    let userList = [];
    return userModel.getUserList()
      .then(users => {
        users = users.filter((user) => user.verified);
        users.map((user) => {
          const { _id, userName, gender, email } = user;
          user = { _id, userName, gender, email };
          userList.push(user);
        });
        res.send({ userList });
      })
      .catch((err) => {
        res.send({ userList });
      })
  });

}