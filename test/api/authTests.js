const chai = require('chai');
const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../app/models/User');
const expect = chai.expect;
const Strings = require('../../app/utils/strings');

describe('API Auth Main', function () {
    var req;
    beforeEach(function () {
        req = supertest(app)
            .get('/api/v1/auth')
    })

    it('should return json/text response.', function (done) {
        req
            .expect('Content-Type', /json/, done)
    });

    it('should return Not found with error message.', function (done) {
        req
            .expect(404, {
                status: 0,
                message: Strings.INVALID_ROUTE
            }, done)
    });
});

describe('Auth Signup API', function () {

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

    it('should register a new user.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-14613',
            email: 'cersi.lannister@student.guc.edu.eg',
            password: 'burnth#town1',
            confirmPassword: 'burnth#town1'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 1,
                message: Strings.SIGNUP_SUCCESS
            })
            .end(function (err, res) {
                if (err) {
                    done(err);
                }

                User.find({
                    email: kingslayer.email
                }, function (err, data) {
                    if (err) {
                        done(err);
                    }
                    expect(data.length).to.equal(1);
                    done();
                });
            });


    });

    it('should not have more than one user with same email.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-14613',
            email: 'cersi.lannister@student.guc.edu.eg',
            password: 'burnth#town1',
            confirmPassword: 'burnth#town1'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.USER_ALREADY_EXISTS
            }, done);
    });

    it('should not allow registration with non-guc mails.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-14613',
            email: 'balabizo@gmail.com',
            password: 'burnth#town1',
            confirmPassword: 'burnth#town1'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.NON_GUC_MAIL
            }, done);
    });
    it('should not allow registration with invalid GUC ID.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-12',
            email: 'cersi.lannister@student.guc.edu.eg',
            password: 'burnth#town1',
            confirmPassword: 'burnth#town1'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.INVALID_GUC_ID
            }, done);
    });

    it('should not allow registration with weak password.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-14613',
            email: 'cersi.lannister@student.guc.edu.eg',
            password: 'easyOne',
            confirmPassword: 'easyOne'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.INVALID_PASSWORD
            }, done);
    });

    it('should not allow registration with mis-matching passwords.', function (done) {
        const kingslayer = {
            firstName: 'Jimmy',
            lastName: 'Lannister',
            gucId: '28-14613',
            email: 'cersi.lannister@student.guc.edu.eg',
            password: 'hello$world1',
            confirmPassword: 'hell$oworld2'
        };

        req
            .send(kingslayer)
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.PASSWORD_MISMATCH
            }, done);
    });

    it('should allow registrations of multiple users.', function (done) {
        const johnSnow = {
            firstName: 'John',
            lastName: 'Snow',
            gucId: '28-1234',
            email: 'john.snow@student.guc.edu.eg',
            password: 'The$tarks0',
            confirmPassword: 'The$tarks0'
        };

        req
            .send(johnSnow)
            .expect('Content-Type', /json/)
            .expect(200, {
                status: 1,
                message: Strings.SIGNUP_SUCCESS
            }, done);
    });
});

describe('Auth Login API', function () {

    const johnSnow = {
        email: 'john.snow@student.guc.edu.eg',
        password: 'The$tarks0',
    };

    var req;
    beforeEach(function () {
        req = supertest(app)
            .post('/api/v1/auth/login')
            .set('Accept', 'application/json')
    });

    it('should login using email and password', function (done) {
        req
            .send(johnSnow)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                expect(res.body.status).to.equal(1);
                expect(res.body.message).to.equal(Strings.LOGIN_SUCCESS);
                done();
            });

    });


    it('should include JWT token after login', function (done) {
        req
            .send(johnSnow)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                const JWTtoken = res.body.token;
                const JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
                expect(JWTtoken).to.match(JWS_REGEX);

                expect(res.body.status).to.equal(1);
                expect(res.body.message).to.equal(Strings.LOGIN_SUCCESS);
                done();
            });
    });

    it('should not login with wrong email', function (done) {
        req.
        send({
                email: 'king' + johnSnow.email,
                password: johnSnow.password
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.INVALID_CREDIENTIALS
            }, done)
    });

    it('should not login with wrong password', function (done) {
        req.
        send({
                email: johnSnow.email,
                password: 'somewrongpassword'
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.INVALID_CREDIENTIALS
            }, done)
    });

    it('should not login with wrong email and password', function (done) {
        req.
        send({
                email: 'king' + johnSnow.email,
                password: 'somewrongpassword'
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.INVALID_CREDIENTIALS
            }, done)
    });

    it('should not login with empty email', function (done) {
        req.
        send({
                password: 'somewrongpassword'
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.MISSING_CREDIENTIALS
            }, done)
    });

    it('should not login with empty passsword', function (done) {
        req.
        send({
                email: johnSnow.email
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                status: 0,
                message: Strings.MISSING_CREDIENTIALS
            }, done)
    });
});