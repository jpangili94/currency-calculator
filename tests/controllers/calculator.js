var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../../app');
var expext = chai.expext;

chai.use(chaiHTTP);

describe('calculator Controller (Version 1)', function() {
  it('should list ALL calculator on /calculator GET');
  it('should list a SINGLE calculator on /calculator/:base GET');
  it('should add a SINGLE calculator on /calculator POST');
  it('should update a SINGLE calculator on /calculator/:base PUT');
  it('should delete a SINGLE calculator on /calculator/:base DELETE');
});