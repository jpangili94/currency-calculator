var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../../app');
var expext = chai.expext;

chai.use(chaiHTTP);

describe('Index Controller (Version 1)', function() {
  it('should list ALL currencies on /currency GET');
  it('should list a SINGLE currency on /currency/:base GET');
  it('should add a SINGLE currency on /currency POST');
  it('should update a SINGLE currency on /currency/:base PUT');
  it('should delete a SINGLE currency on /currency/:base DELETE');
});