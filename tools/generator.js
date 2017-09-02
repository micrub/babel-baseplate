import inquirer from "inquirer";
import fs from "fs";
import os from "os";
import async from "async";
import path from "path";
let d = (i, type) => {
  let dn = path.dirname
  return dn(dn(i)) + "/"+type+"/"
};
let SRC_DIR = d( __filename, 'src' );
let TEST_DIR = d( __filename, 'test' );

function generatePackage (ns, classname) {
  return new Promise((resolve, reject) => {
  })
}
function generateClass (ns, classname) {
  return new Promise((resolve, reject) => {
  })
}
function generateTest (ns, classname) {
  return new Promise((resolve, reject) => {
  })
}

let p = inquirer.prompt
function handlePackageCreation (next){
  getPackageName((answers) => {
    let domain = answers.template;
    let parts = domain.split('.')
    let rparts = parts.reverse()
    let path = SRC_DIR
    let tpath = TEST_DIR
    let level = -1
    async.mapSeries(rparts, (item, clbk) => {
          level++;
      path += item + "/"
      tpath += item + "/"
      try {
        fs.mkdirSync(path);
        fs.mkdirSync(tpath);
        let index = fs.createWriteStream(path + "index.js")
        let index2 = fs.createWriteStream(tpath + "index.js")
        index.on('open', (s) => {
          index.write("export default {}\n")
          index.end()
        })
        index2.on('open', (s) => {
          index2.write("import M from '"+ "../".repeat(level)+"src/"+item+"/index.js'\n describe('test', ()=>{\
          it('description', function () { \
          expect(true).to.be.true;\
          });\
          })")
          index2.end()
        })
        index.on('error',(e) => {
          clbk(null, [item, e, path])
        })
        index2.on('error',(e) => {
          clbk(null, [item, e, path])
        })
        clbk(null, [item, null, path])
      } catch (e) {
        //console.log(e.code, path);
        clbk(null, [item, e.code, path])
      }
    },next)
  })
}
function start() {
  p({
    type: "list",
    message: "What to generate?",
    name: "template",
    choices: [
      { name: "package", value: "package" },
      { value: "classAndTest", name: "class with unit test" }
    ]
  })
  .then(function(answers) {
    // Use user feedback for... whatever!!
    //TODO ask name
    switch (answers.template) {
      case 'package':
        //TODO get input
        handlePackageCreation((err, results) => {
          console.log(err, results);
        })
        break;
      case 'classAndTest':
        break;log
      default:
        process.exit(0)
    }
    //handleAnswers(answers, ns, classname);
  })
  .catch(err => {
    console.log(err);
    process.exit(0)
  });
}

function getPackageName(next) {
  p({
    type: "input",
    message: "Input name separated by commas, which represent level in fs on registry object." +"\n"+"For example `util.components.domain.com` in fs will be `com/domain/components/util` and NS will be `com.domain.components.util`" +"\n",
    name: "template"
  })
  .then(function(answers) {
    next(answers)
  })
}
function getClassName(next) {
  p({
    type: "input",
    message: "Input name separated by commas, which represent level in fs on registry object." +"\n"+"For example `util.components.domain.com` in fs will be `com/domain/components/util` and NS will be `com.domain.components.util`" +"\n",
    name: "template"
  })
  .then(function(answers) {
    next(answers)
  })
}

function handleAnswers(answers, ns, classname) {
  switch (answers.template) {
    case 'package':
      generatePackage(ns)
      break;
    case 'classAndTest':
      generateClass(ns, classname).then((ns, classname) => {
        generateTest(ns, classname)
      })
      break;
    default:
      process.exit(0)
  }
}
start()
