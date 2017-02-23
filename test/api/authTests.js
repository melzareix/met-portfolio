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
                message: Strings.INVALID_ROUTE
            }, done)
    });
});

describe('Auth Signup API', function () {

    const johnSnow = {
        firstName: 'John',
        lastName: 'Snow',
        gucId: '28-1234',
        email: 'john.snow@student.guc.edu.eg',
        password: 'The$tarks0',
        confirmPassword: 'The$tarks0'
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
                message: Strings.PASSWORD_MISMATCH
            }, done);
    });

    it('should allow registrations of multiple users.', function (done) {
        req
            .send(johnSnow)
            .expect('Content-Type', /json/)
            .expect(200, {
                message: Strings.SIGNUP_SUCCESS
            }, done);
    });
});