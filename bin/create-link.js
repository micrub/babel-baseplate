#!/usr/bin/env node

const NS = ['babel','baseplate'].join('-')
const shell = require('shelljs');
const argv = require('yargs').argv
const d = require('debug')(NS)
const path = require('path')
const NIY = 'TBD:NIY'
const REPO_URL = 'https://github.com/micrub/babel-baseplate.git'
const SUCCESS_MESSAGE = 'babel-baseplate is linked.'

shell.config.silent  = true
shell.config.verbose = true
shell.config.fatal   = false

var package = null;

d('start')
//TODO should be runned forom repos root folder
try {
  package = require('../package.json')
  let name  = package.name
  d(name, NS)
  if (name === NS) {
    let options, src, target, r;
    let current_dir = [shell.pwd().stdout, 'bin'].join('/')
    options = '-s'
    src = current_dir + '/create-babel-baseplate.js'
    target = '~/bin/create-babel-baseplate-script.sh'
    r = shell.ln(options, src, target)
    if (r.code !== 0) {
      shell.echo(r.stderr);
      shell.exit(1)
    } else {
      shell.echo(SUCCESS_MESSAGE);
      shell.exit(0)
    }
  } else {
    shell.echo("Must be executed from repository root or bin directory.");
    shell.exit(1)
  }

} catch (e) {
  /* handle error */
  shell.echo("Must be executed from repository root or bin directory.");
  shell.exit(1)
}

