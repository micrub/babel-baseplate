"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _inquirer = require("inquirer");

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var d = function d(i, type) {
  var dn = _path2.default.dirname;
  return dn(dn(i)) + "/" + type + "/";
};
var SRC_DIR = d(__filename, 'src');
var TEST_DIR = d(__filename, 'test');

function generatePackage(ns, classname) {
  return new _promise2.default(function (resolve, reject) {});
}
function generateClass(ns, classname) {
  return new _promise2.default(function (resolve, reject) {});
}
function generateTest(ns, classname) {
  return new _promise2.default(function (resolve, reject) {});
}

var p = _inquirer2.default.prompt;
function handlePackageCreation(next) {
  getPackageName(function (answers) {
    var domain = answers.template;
    var parts = domain.split('.');
    var rparts = parts.reverse();
    var path = SRC_DIR;
    var tpath = TEST_DIR;
    var level = -1;
    _async2.default.mapSeries(rparts, function (item, clbk) {
      level++;
      path += item + "/";
      tpath += item + "/";
      try {
        _fs2.default.mkdirSync(path);
        _fs2.default.mkdirSync(tpath);
        var index = _fs2.default.createWriteStream(path + "index.js");
        var index2 = _fs2.default.createWriteStream(tpath + "index.js");
        index.on('open', function (s) {
          index.write("export default {}\n");
          index.end();
        });
        index2.on('open', function (s) {
          index2.write("import M from '" + "../".repeat(level) + "src/" + item + "/index.js'\n describe('test', ()=>{\
          it('description', function () { \
          expect(true).to.be.true;\
          });\
          })");
          index2.end();
        });
        index.on('error', function (e) {
          clbk(null, [item, e, path]);
        });
        index2.on('error', function (e) {
          clbk(null, [item, e, path]);
        });
        clbk(null, [item, null, path]);
      } catch (e) {
        //console.log(e.code, path);
        clbk(null, [item, e.code, path]);
      }
    }, next);
  });
}
function start() {
  p({
    type: "list",
    message: "What to generate?",
    name: "template",
    choices: [{ name: "package", value: "package" }, { value: "classAndTest", name: "class with unit test" }]
  }).then(function (answers) {
    // Use user feedback for... whatever!!
    //TODO ask name
    switch (answers.template) {
      case 'package':
        //TODO get input
        handlePackageCreation(function (err, results) {
          console.log(err, results);
        });
        break;
      case 'classAndTest':
        break;log;
      default:
        process.exit(0);
    }
    //handleAnswers(answers, ns, classname);
  }).catch(function (err) {
    console.log(err);
    process.exit(0);
  });
}

function getPackageName(next) {
  p({
    type: "input",
    message: "Input name separated by commas, which represent level in fs on registry object." + "\n" + "For example `util.components.domain.com` in fs will be `com/domain/components/util` and NS will be `com.domain.components.util`" + "\n",
    name: "template"
  }).then(function (answers) {
    next(answers);
  });
}
function getClassName(next) {
  p({
    type: "input",
    message: "Input name separated by commas, which represent level in fs on registry object." + "\n" + "For example `util.components.domain.com` in fs will be `com/domain/components/util` and NS will be `com.domain.components.util`" + "\n",
    name: "template"
  }).then(function (answers) {
    next(answers);
  });
}

function handleAnswers(answers, ns, classname) {
  switch (answers.template) {
    case 'package':
      generatePackage(ns);
      break;
    case 'classAndTest':
      generateClass(ns, classname).then(function (ns, classname) {
        generateTest(ns, classname);
      });
      break;
    default:
      process.exit(0);
  }
}
start();

