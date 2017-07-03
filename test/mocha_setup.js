'use strict';

var context = global

var _ = require('lodash')
var chai = require('chai')
var given = require('given')
var sinon = require('sinon')
var expect = require('chai').expect;

var registerGiven = function() {
  this.given = given(this);
}

var moduleOutput = {
  chai,
  expect,
  given,
  registerGiven,
  sinon,
}

_.extend(context, moduleOutput)

module.exports = moduleOutput
