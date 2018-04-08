import User from '../models/user';
import Workspace from '../models/workspace';
import secret from '../secret';
import cuid from 'cuid';
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

const errors = {
    REGISTER_USERNAME_TAKEN: 'That username is taken. Try another.',
    REGISTER_EMAIL_TAKEN: 'That email is taken. Try another',
    REGISTER_GENERAL_ERROR: 'an error has occured',
    LOGIN_INVALID: 'Invalid password !',
    LOGIN_GENERAL_ERROR: 'Unregistered User !',
    USER_NOT_EXIST: 'Sorry, Specified account does not exist',
    UNAUTHORIZED: 'Unauthorized',
    WORKSPACE_FIND_ERROR: 'Not existed Workspace'
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
  if (!(req.body.user.email || req.body.user.username) || !req.body.user.password || !req.body.user.workspace_title) {
    return res.json({err: errors.USER_NOT_EXIST});
  }

  var email = sanitizeHtml(req.body.user.email);
  var username = sanitizeHtml(req.body.user.username);
  var workspace_title = sanitizeHtml(req.body.user.workspace_title);
  var data;
  if (email != 'undefined') {
      data = {
          email: email,
          workspace_title: workspace_title
      };
  }
  else if(username != 'undefined') {
      data = {
          username: username,
          workspace_title: workspace_title
      };
  } else {
      res.json({
          status: 0,
          message: err
      });
  }
  console.log(data);

  User.findOne(data).exec((err, user) => {
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

        Workspace.findOne({ cuid: user.workspace_title}).exec((err, workspace) => {
          if (err) {
            return res.status(500).send({err: errors.WORKSPACE_FIND_ERROR}); 
          }
          return res.json({
            user,
            token: token,
            workspace
          });
        })
        
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
      console.log(decoded)
      User.findOne({ cuid: decoded.id }).exec((err, user) => {
        if(!user) return res.status(401).send({err: errors.UNAUTHORIZED});
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
  try {
    // TODO sanitize req.headers.authorization
    var decoded = jwt.verify(req.headers.authorization, secret.secret);
    console.log(decoded)
    User.findOne({ cuid: decoded.id }).exec((err, user) => {
      if (err) {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
      }
      if(!user) return res.status(401).send({err: errors.UNAUTHORIZED});
      User.find({workspace_title: req.query.workspace_title}).sort('-dateAdded').exec((err, users) => {
        if (err) {
          res.status(500).send(err);
        }
        return res.json({ users });
      });
    });
  } catch(err) {
    // error during JWT verify
    console.log('decoded error')
    return res.status(401).send({err: errors.UNAUTHORIZED}); 
  }
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

export function authorizedUser(req, res) {
  if (!(req.body.user.token || req.body.user.username)) {
    return res.status(403).end();
  }

  var token = sanitizeHtml(req.body.user.token);
  var username = sanitizeHtml(req.body.user.username);
  try {
    var decoded = jwt.verify(token, secret.secret);
    User.findOne({ cuid: decoded.id }).exec((err, user) => {
      if (err) {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
      }
      if(!user) return res.status(401).send({err: errors.UNAUTHORIZED});
      Workspace.findOne({ cuid: user.workspace_title}).exec((err, workspace) => {
        if (err) {
          return res.status(500).send({err: errors.WORKSPACE_FIND_ERROR}); 
        }
        return res.json({ user, workspace });
      })
    });
  } catch(err) {
    // error during JWT verify
    console.log('decoded error')
    return res.status(401).send({err: errors.UNAUTHORIZED}); 
  }
}
