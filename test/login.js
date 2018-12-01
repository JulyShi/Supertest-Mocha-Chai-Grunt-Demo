
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const request = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;



const Service = "AAA";

let formData;
var token;

function setFormDataAsUser(user) {
    switch (user) {
        case 'admin':
            formData = 'username=admin&password=admin&grant_type=password';
            break;
        case 'it':
            formData = 'username=ituser&password=ituser&grant_type=password';
            break;
        case 'sales':
            formData = 'username=salesuser&password=salesuser&grant_type=password';
            break;
        case 'traffic':
            formData = 'username=trafficuser&password=trafficuser&grant_type=password';
            break;
        case 'client':
            formData = 'username=KXClient&password=KXClient&grant_type=password';
            break;
        default:
            break;
    }
}

function loginUser (user) {
    return function (done) {

        this.timeout(10000);

        setFormDataAsUser(user);

        request(Campaign_Service)
            .post('/oauth/token')
            .send(formData)
            .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
            .set('Authorization', 'Basic ZnJvbnRlbmQ6ZnJvbnRlbmRfc2VjdXJpdHk=')
            .expect(function (res) {
                console.log("res.status:", res.status);
                console.log("res.body.token_type:", res.body.token_type);
                console.log("res.body.access_token:", res.body.access_token);

                expect(res.status).to.equal(200);
                let token = res.body.token_type + ' ' + res.body.access_token;

                console.log("token:", token);
                global.token = token;

            }).end(done)
    }
}

it('should require authorization', function (done) {
    request(Campaign_Service)
        .post('/oauth/token')
        .expect(401)
        .end(function (err) {
            if (err) return done(err);
            done();
        });
});

global.loginUser = loginUser;