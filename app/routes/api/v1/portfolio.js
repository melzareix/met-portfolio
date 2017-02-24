const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authHelper = require('../../../middlewares/authMiddleware');
const multer = require('multer');
const Strings = require('../../../utils/strings');

const router = express.Router();
require('dotenv').config();
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

/**
 * Create a new portfolio
 */

router.post('/create', authHelper.strategy, function (req, res) {

});

/**
 * Add new portfolio item
 */
router.get('/add', authHelper.strategy, function (req, res, next) {
    const title = req.body.title,
        desc = req.body.description,
        link = req.body.link,
        repo = req.body.repo,
        cover = req.file;

    let errs = [];
    errs.push('1');
    errs.push('2');
    errs.push('3');

    return next(errs);

});

module.exports = router;