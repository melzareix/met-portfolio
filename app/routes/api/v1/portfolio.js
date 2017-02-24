const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authHelper = require('../../../middlewares/authMiddleware');
const multer = require('multer');
const Strings = require('../../../utils/strings');
const path = require('path');
const User = require('../../../models/User');
const WorkItem = require('../../../models/WorkItem');
const Portfolio = require('../../../models/Portfolio');
const crypto = require('crypto');

const router = express.Router();
require('dotenv').config();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));


/**
 * Multer Configuration
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        const buf = crypto.randomBytes(48);
        cb(null, Date.now() + buf.toString('hex') + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
});

/**
 * Create a new portfolio
 */

router.post('/create', authHelper.authMiddleware, function (req, res) {

});

/**
 * Testing
 */
router.get('/', authHelper.authMiddleware, function (req, res, next) {
    new Portfolio({
        _creator: req.user.id,
        displayURL: 'helloworld'
    }).save(function (err, data) {
        if (err) {
            return next(err);
        }
        let student = req.user;
        student.portfolio = data.id;
        student.save(err => {
            if (err) {
                return next(err);
            }
        });
    });
});

/**
 * Add new portfolio item
 */


router.post('/add', upload.single('cover'), authHelper.authMiddleware, function (req, res, next) {
    const title = req.body.title,
        description = req.body.description,
        liveDemo = req.body.link,
        githubRepo = req.body.repo,
        coverImage = req.file;

    let errors = [];

    if (!title) {
        errors.push(Strings.EMPTY_TITLE);
    }
    if (!liveDemo && !githubRepo && !coverImage) { // User left all three fields empty
        errors.push(Strings.EMPTY_WORK);
    }

    if (errors.length > 0) {
        return next(errors);
    }

    let student = req.user;
    // Student doesn't have a portfolio

    if (!student.portfolio) {
        return next(Strings.NO_PORTFOLIO);
    }

    const portfolioItem = new WorkItem({
        title,
        description,
        coverImage: coverImage.path,
        liveDemo,
        githubRepo
    });

    portfolioItem.save((err, newItem) => { // Save the created Item
        if (err) {
            return next(err);
        }
        Portfolio.findOne({ // Add the item to the corresponding portfolio
            _id: student.portfolio
        }, function (err, data) {
            data.works.push(newItem._id);
            data.save((err) => {
                if (err) {
                    return next(err);
                }
                return res.json({
                    message: Strings.WORK_ADDED
                });
            });
        });
    });
});


/**
 * Error Handling Middleware
 */
router.use(function (err, req, res, next) {
    return res.status(400).json({
        message: err
    });
});

module.exports = router;