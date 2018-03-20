import User from '../models/user';
import secret from '../secret';
import cuid from 'cuid';
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';


const errors = {
    REGISTER_USERNAME_TAKEN: 'That username is taken. Try another.',
    REGISTER_EMAIL_TAKEN: 'That email is taken. Try another',
    REGISTER_GENERAL_ERROR: 'an error has occured',
    LOGIN_INVALID: 'sorry, invalid password',
    LOGIN_GENERAL_ERROR: 'sorry, invalid username',
    USER_NOT_EXIST: 'Sorry, Specified account does not exist',
};

export function register(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  const newUser = new User(req.body.user);

  newUser.username = sanitizeHtml(newUser.username);
  newUser.email = sanitizeHtml(newUser.email);
  newUser.cuid = cuid();

  newUser.save((err, saved) => {
    if (err) {
      if(err.message.indexOf('duplicate key error') !== -1) {
        if(err.message.indexOf('username_1') !== -1) {
          return res.status(500).send({err: errors.REGISTER_USERNAME_TAKEN, error: err.message});
        }
        if(err.message.indexOf('email_1') !== -1) {
          return res.status(500).send({err: errors.REGISTER_EMAIL_TAKEN, error: err.message});
        }
      }
      else {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR, error: err.message}); 
      }
    }
    return res.json({
        user: {            
          username: saved.username,
        } 
    });
  });
}

export function login(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  const username = sanitizeHtml(req.body.user.username);

  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({err: errors.LOGIN_GENERAL_ERROR});
    }
    else if(!user) {
      return res.json({err: errors.LOGIN_GENERAL_ERROR});
    }
    user.comparePassword(req.body.user.password, function(err, isMatch) {
      if (err) throw err;

      if(isMatch) {
        var token = jwt.sign({'id':user.cuid}, secret.secret, {
          expiresIn: 31536e3
        });
        return res.json({
           user: {
            username: user.username,
           },
          token: token,
        });
      }
      else {
        return res.json({err: errors.LOGIN_INVALID});
      }
    });
  });
}
export function updateUserInfo(req, res) {
    if (!req.body.password) {
      return res.status(403).end();
    }
    try {
      // TODO sanitize req.headers.authorization
      var decoded = jwt.verify(req.headers.authorization, secret.secret);
      User.findOne({ cuid: decoded.cuid }).exec((err, user) => {
        if (err) {
          return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
        }

        if(req.body.password !== undefined){ 
          user.password = req.body.password; 
        }

        user.save((err, saved) => {
          if (err) {
              return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
          }
          return res.json({
            user: {
              username: saved.username,
              email: saved.email,
            } 
          });        
        });
      });
    } catch(err) {
      // error during JWT verify
      return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }

}

/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().sort('-dateAdded').exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ users });
  });
}

/**
 * Delete a user
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  User.findOne({ cuid: req.params.cuid }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    if (user) {
      user.remove((err) => {
        res.status(200).end();
      });
    }
    else res.status(500).send({err: errors.USER_NOT_EXIST});
  });
}
