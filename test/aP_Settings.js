process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var config = require('../config/env_config'), request = require('supertest')(config.host[config.env]);
var chai = require('chai');
var expect = require('chai').expect;

var jsonType = 'application/json';
var token;
var aPkey1;
var aPkey2;
var aPkey3;

var now = new Date();
var ap1 = "AP" + now.setDate(now.getDate());
var ap2 = "AP" + now.setDate(now.getDate() + 1);
var ap3 = "AP" + now.setDate(now.getDate() + 2);
var airportHQ = "HQ";
var location = "T1|DOM|VIP";
var encode = "HQ%7CT1%7CDOM%7CVIP";


describe('Feature: E2E Testing for AP_Settings: Add/list/delete/search',function() {

    before('Given login the system', function (done) {
        this.timeout(10000);
        var login_requestbody = {
            "username": "admin",
            "password": "admin"
        };
        request.post('/auth')
            .send(login_requestbody)
            .expect(200)
            .expect(function (res) {
                token = res.body.token;
                console.log('--------------------------------')
            }).end(done)
    });

    it('When Add an individual AP', function (done) {
        this.timeout(10000);
        var requestbody = {
            "airport":airportHQ,
            "location":location,
            "ap-list":
            [
                ap1
            ]
        };
        request.post('/locations/access-points')
            .set('Authorization', token)
            .set('Content-Type', jsonType)
            .send(requestbody)
            .expect(202, done)
    });

    it('Then the AP should be displayed at the first one of the AP list', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points')
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                expect(res.body.content[0].ap).to.equal(ap1);
                aPkey1 = res.body.content[0].key;
            }).end(done)
    });

    it('And I can get the AP by searching with AP name', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points?ap=' + ap1)
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                expect(res.body.content[0].ap).to.equal(ap1);
                expect(res.body.content[0].key).to.equal(aPkey1);
            }).end(done)
    });

    it('When Add multiple APs', function (done) {
        this.timeout(10000);
        var requestbody = {
            "airport":airportHQ,
            "location":location,
            "ap-list":
                [
                    ap2,
                    ap3
                ]
        };
        request.post('/locations/access-points')
            .set('Authorization', token)
            .set('Content-Type', jsonType)
            .send(requestbody)
            .expect(202, done)
    });

    it('Then those AP should be displayed in the AP list in order', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points')
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                // expect(res.body.content[0].ap).to.equal(ap3);
                // expect(res.body.content[1].ap).to.equal(ap2);
                expect(res.body.content[2].ap).to.equal(ap1);
                expect(res.body.content[2].key).to.equal(aPkey1);
                aPkey3 = res.body.content[0].key;
                aPkey2 = res.body.content[1].key;
            }).end(done)
    });

    it('And I can get those AP by searching with location', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points?location=' + encode)
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                // expect(res.body.content[0].ap).to.equal(ap3);
                // expect(res.body.content[1].ap).to.equal(ap2);
                expect(res.body.content[2].ap).to.equal(ap1);
            }).end(done)
    });

    it('When Add duplicate APs, it should be failed', function (done) {
        this.timeout(10000);
        var requestbody = {
            "airport":airportHQ,
            "location":location,
            "ap-list":
                [
                    ap1,
                    ap2,
                    ap3
                ]
        };
        request.post('/locations/access-points')
            .set('Authorization', token)
            .set('Content-Type', jsonType)
            .send(requestbody)
            .expect(409, done)
    });

    it('When I delete an AP', function (done) {
        this.timeout(10000);
        request.delete('/locations/access-points/' + aPkey3)
            .set('Authorization', token)
            .expect(200,done)
    });

    it('Then that AP should not be displayed in the AP list', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points')
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                // expect(res.body.content[0].ap).to.equal(ap2);
                expect(res.body.content[1].ap).to.equal(ap1);
            }).end(done)
    });

    it('And I cannot search it out with location', function (done) {
        this.timeout(10000);
        request.get('/locations/access-points?location=' + encode)
            .set('Authorization', token)
            .expect(200)
            .expect(function (res) {
                // expect(res.body.content[0].ap).to.equal(ap2);
                expect(res.body.content[1].ap).to.equal(ap1);
            }).end(done)
    });

});
