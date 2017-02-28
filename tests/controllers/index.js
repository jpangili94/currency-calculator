var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../../app');
var expext = chai.expext;

chai.use(chaiHTTP);

describe('Index Controller (Version 1)', function() {
  it('should list ALL index on /index GET');
  it('should list a SINGLE index on /index/:title GET');
  it('should add a SINGLE index on /index POST');
  it('should update a SINGLE index on /index/:title PUT');
  it('should delete a SINGLE index on /index/:title DELETE');
});