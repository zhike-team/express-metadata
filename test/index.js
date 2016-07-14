'use strict';

const http = require('http');
const expect = require('chai').expect;
const metadata = require('..');
const express = require('express');
const app = metadata(express());
const request = require('supertest')(app);



describe('express metadata', function() {
  it('should return metadata', function(done) {
    app.get('/awesome/2', function(req, res) {
      res.send(app.metadata())
    });

    let server = http.createServer(app).listen(0);
    request.get('/awesome/2')
      .expect(function(res) {
        expect(res.body).to.have.all.keys('routersSetting', 'projectInfo');
      })
      .end(done)

    server.close();
    });

  it('should return common result', function(done) {
    app.get('/awesome', function(req, res) {
      res.send({ret: 'metadata'})
    });

    let server = http.createServer(app).listen(0);

    request.get('/awesome')
      .expect(function(res) {
        expect(res.body.ret).to.eql('metadata')
      })
      .end(done)
  })

})
