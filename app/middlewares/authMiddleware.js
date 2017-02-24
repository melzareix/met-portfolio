const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/User');
const InvalidToken = require('../models/InvalidToken');

require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;
const JWTOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeader(),
    secretOrKey: JWT_KEY,
    passReqToCallback: true
};

/**
 * Authentication Strategy.
 */

var strategy = new JWTStrategy(JWTOptions, function (req, payload, done) {
    User.findOne({
        _id: payload.id
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, 'Invalid Credentials.');
        }

        const tokenCreationTime = new Date(parseInt(payload.iat) * 1000);
        const lastPasswordChangeTime = user.passwordChangeDate;
        const reqToken = parseAuthHeader(req.headers['authorization']).value;
        // Check if token is blacklisted.
        InvalidToken.findOne({
            token: reqToken
        }, function (err, token) {
            if (err) {
                return done(err);
            }
            if (token) {
                return done(null, false, 'Invalid Token.');
            } else {
                // Check if user changed password after generating token.
                if (tokenCreationTime.getTime() < lastPasswordChangeTime.getTime()) {
                    return done(null, false, 'Invalid Token.');
                }
                return done(null, user);
            }
        });
    });
});


/**
 * Extract JWT Token from the header.
 * https://github.com/themikenicholson/passport-jwt/blob/master/lib/auth_header.js
 */

var parseAuthHeader = function (hdrValue) {
    if (typeof hdrValue !== 'string') {
        return null;
    }
    var matches = hdrValue.match(/(\S+)\s+(\S+)/);
    return matches && {
        scheme: matches[1],
        value: matches[2]
    };
}

/**
 * Middleware for JWT authentication validation.
 */

var authMiddleware = function (req, res, next) {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                message: info.toString()
            });
        }
        req.user = user;
        return next();
    })(req, res, next);
};

module.exports = {
    strategy,
    authMiddleware,
    parseAuthHeader
};