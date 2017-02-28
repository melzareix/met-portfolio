const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');


const authMiddleware = require('./app/middlewares/authMiddleware');
const authAPIv1 = require('./app/routes/api/v1/auth');
const portfolioAPIv1 = require('./app/routes/api/v1/portfolio');

const app = express();
require('dotenv').config();

/**
 * Passport Initialization
 */

passport.use(authMiddleware.strategy);
app.use(passport.initialize());


/**
 * DEBUG MODE MIDDLEWARES
 */

if (process.env.DEBUG_MODE) {
    app.use(logger('dev'));
}

/**
 * API ROUTES
 */

app.use('/api/v1/auth', authAPIv1);
app.use('/api/v1/portfolio', portfolioAPIv1);

app.use(express.static(path.join(__dirname, './public/dist')));

/**
 * DEV MODE DATABASE SEED
 */
app.get('/seed-database', function (req, res) {
    if (!process.env.DEBUG_MODE) {
        return res.redirect('/');
    }

    const studentData = require('./app/seed/students.json');
    const workItemData = require('./app/seed/items.json');
    const User = require('./app/models/User');
    const WorkItem = require('./app/models/WorkItem');
    const Tags = require('./app/seed/tags.json');
    let cnt = 0;

    createTags(Tags.tags, (tags) => {
        studentData.forEach((student) => {
            let rand = Math.floor(Math.random() * (6));
            let tagRand = Math.floor(Math.random() * (12));
            workItemData[rand].tags = [tags[tagRand]];
            new WorkItem(workItemData[rand]).save((err, data) => {
                student.portfolio = [data];
                new User(student).save((err, data) => {
                    cnt++;
                    if (cnt == 29) {
                        return res.redirect('/');
                    }
                });
            });
        });
    });
});

/**
 * Seperate Tags by Comma
 */
let createTags = (tagsSeperated, cb) => {
    const Tag = require('./app/models/Tag');
    let callBacksLeft = tagsSeperated.length;
    const newTags = [];
    tagsSeperated.forEach((tag) => {
        Tag.findOrCreate({
            name: tag
        }, (err, newTag, created) => {
            callBacksLeft--;
            newTags.push(newTag);
            if (callBacksLeft === 0) {
                cb(newTags);
            }
        });
    });
};

app.get('/*', function (req, res) {
    res.redirect('/#' + req.path);
});
/**
 * Generic Error Handling Middlewares.
 */
app.use(function (err, req, res, next) {
    return res.status(500).json({
        message: err.toString()
    });
});

module.exports = app;