import Workspace from '../models/workspace';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
const sendmail = require('sendmail')({silent: true});
var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */

export function getWorkspaces(req, res) {
  Workspace.find().sort('-dateAdded').exec((err, workspaces) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ workspaces });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addWorkspace(req, res) {
  if (!req.body.workspace.full_name || !req.body.workspace.display_name || !req.body.workspace.admin_user) {
    return res.status(403).end();
  }

  const newWorkspace = new Workspace(req.body.workspace);

  // Let's sanitize inputs
  newWorkspace.full_name = sanitizeHtml(newWorkspace.full_name);
  newWorkspace.display_name = sanitizeHtml(newWorkspace.display_name);
  newWorkspace.admin_user = sanitizeHtml(newWorkspace.admin_user);
  newWorkspace.cuid = cuid();
  newWorkspace.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ workspace: saved });
    }
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getWorkspace(req, res) {
  Workspace.findOne({ cuid: req.params.cuid }).exec((err, workspace) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ workspace });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteWorkspace(req, res) {
  Workspace.findOne({ cuid: req.params.cuid }).exec((err, workspace) => {
    if (err) {
      res.status(500).send(err);
    }

    workspace.remove(() => {
      res.status(200).end();
    });
  });
}
