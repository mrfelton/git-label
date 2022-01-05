"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLabel = createLabel;
exports.createLabels = createLabels;
exports.deleteLabel = deleteLabel;
exports.deleteLabels = deleteLabels;
exports.formatLabel = formatLabel;
exports.getLabels = getLabels;

var _request = _interopRequireDefault(require("../lib/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Sends a request to GitHub to create a label
 *
 * @name createLabel
 * @function
 * @param {Object} server the server configuration object
 * @param {String} server.api the api endpoint to connect to
 * @param {String} server.token the api token to use
 * @param {String} server.repo the git repo to manipulate
 * @param {String} name the name of the label
 * @param {String} color the hexidecimal color of the label
 * @param {String} description the description of the label
 * @return {Promise}
 */
function createLabel(_ref, name, color, description) {
  var api = _ref.api,
      token = _ref.token,
      repo = _ref.repo;
  return (0, _request["default"])({
    headers: {
      'User-Agent': 'request',
      'Authorization': "token ".concat(token),
      'Accept': 'text/html, application/vnd.github.symmetra-preview+json'
    },
    url: "".concat(api, "/").concat(repo, "/labels"),
    form: JSON.stringify({
      name: name,
      color: color,
      description: description
    }),
    method: 'POST',
    json: true
  });
}
/**
 * Sends a request to GitHub to delete a label
 *
 * @name deleteLabel
 * @function
 * @param {Object} server the server configuration object
 * @param {String} server.api the api endpoint to connect to
 * @param {String} server.token the api token to use
 * @param {String} server.repo the git repo to manipulate
 * @param {String} name the name of the label to delete
 * @return {Promise}
 */


function deleteLabel(_ref2, name) {
  var api = _ref2.api,
      token = _ref2.token,
      repo = _ref2.repo;
  return (0, _request["default"])({
    headers: {
      'User-Agent': 'request',
      'Authorization': "token ".concat(token)
    },
    url: "".concat(api, "/").concat(repo, "/labels/").concat(name),
    method: 'DELETE',
    json: true
  });
}
/**
 * Retrieves a list of labels from Github
 *
 * @name getLabels
 * @function
 * @param {Object} server the server configuration object
 * @param {String} server.api the api endpoint to connect to
 * @param {String} server.token the api token to use
 * @param {String} server.repo the git repo to manipulate
 * @return {Promise}
 */


function getLabels(_ref3) {
  var api = _ref3.api,
      token = _ref3.token,
      repo = _ref3.repo;
  return (0, _request["default"])({
    headers: {
      'User-Agent': 'request',
      'Authorization': "token ".concat(token)
    },
    url: "".concat(api, "/").concat(repo, "/labels"),
    method: 'GET',
    json: true
  });
}
/**
 * Properly formats an object for a label for a GitHub request
 *
 * @name formatLabel
 * @function
 * @param {String} name the name of the label
 * @param {String} color the hexidecimal color of the label
 * @param {String} description the description of the label
 * @return {Object} a properly formated label object that can be sent to GitHub
 */


function formatLabel(_ref4) {
  var name = _ref4.name,
      color = _ref4.color,
      description = _ref4.description;
  return {
    name: name,
    description: description,
    color: color.replace('#', '')
  };
}
/**
 * Prepares and sends a request to GitHub to create multiple labels
 *
 * @name createLabels
 * @function
 * @param {Object} server the server configuration object
 * @param {String} server.api the api endpoint to connect to
 * @param {String} server.token the api token to use
 * @param {String} server.repo the git repo to manipulate
 * @param {array} labels an array of objects containing data to be formatted and sent to GitHub
 * @return {Promise}
 */


function createLabels(server, labels) {
  return Promise.all(labels.map(formatLabel).map(function (_ref5) {
    var name = _ref5.name,
        color = _ref5.color,
        description = _ref5.description;
    return createLabel(server, name, color, description);
  }));
}
/**
 * Deletes all of the current labels associated with the GitHub repo
 *
 * @name deleteLabels
 * @function
 * @param {Object} server the server configuration object
 * @param {String} server.api the api endpoint to connect to
 * @param {String} server.token the api token to use
 * @param {String} server.repo the git repo to manipulate
 * @return {Promise}
 */


function deleteLabels(server, labels) {
  return Promise.all(labels.map(formatLabel).map(function (_ref6) {
    var name = _ref6.name,
        color = _ref6.color;
    return deleteLabel(server, name);
  }));
}