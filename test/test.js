
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://campaign:campaignpassword@164:8017/management';//

// Database Name

const dbName = 'management';

describe('mongoDB test', function(){

    it('connect to mongoDB', function (done) {

        MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {

            assert.equal(null, err);
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            // db.auth('campaign','campaignpassword');
            const result = db.collection('campaign').find({"scheduleId":"5abaf840d4f045000792ba2f"});
            result.forEach((r) => console.log('find--->', r))
            ;
            client.close();
            console.log("Closed successfully to server");
            done();
            console.log("Done successfully to server");
        });

    });
    xit('Test DB connect', ()=> {
        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            const db = client.db("management");
            var cursor = db.collection('campaign').find({"scheduleId":"5abaf840d4f045000792ba2f"});
            function iterateFunc(doc) {
                console.log(JSON.stringify(doc, null, 4));
            }
            function errorFunc(error) {
                console.log(error);
            }
            cursor.forEach(iterateFunc, errorFunc);
            client.close();
        });
    })

});


