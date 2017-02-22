const chai = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../app/models/User');
const expect = chai.expect;

describe('API Auth Main', function () {
    var req;
    beforeEach(function () {
        req = supertest(app)
            .get('/api/v1/auth')
    })

    it('should return json/text response', function (done) {
        req
            .expect('Content-Type', /json/, done)
    });

    it('should return bad request with Invalid or Missing Data', function (done) {
        req
            .expect(400, {
                message: 'Invalid or Missing Data'
            }, done)
    });
});

describe('Auth Signup API', function () {
    const zarei = {
        email: 'mohamedelzarei@gmail.com',
        password: 'helloworld'
    };

    const mazen = {
        email: 'youcantseemee@gmail.com',
        password: 'imagineme'
    };

    var req;

    before(function (done) {
        User.collection.drop();
        User.ensureIndexes(done); // Create indexes after droping the collection
    });

    beforeEach(function () {
        req = supertest(app)
            .post('/api/v1/auth/signup')
            .set('Accept', 'application/json')
    });

    it('should register a new user', function (done) {
        req
            .send(zarei)
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Signed Up Successfully'
            })
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                User.find({
                    email: zarei.email
                }, function (err, data) {
                    if (err) {
                        done(err);
                    }
                    expect(data.length).to.equal(1);
                    done();
                });
            });


    });

    it('should not have more than one user with same email', function (done) {
        req
            .send(zarei)
            .expect('Content-Type', /json/)
            .expect(400, done);
    });

    it('should register more than one user', function (done) {
        req
            .send(mazen)
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Signed Up Successfully'
            }, done);
    });
});