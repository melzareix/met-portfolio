const express = require('express');
const bodyParser = require('body-parser');
const authHelper = require('../../../middlewares/authMiddleware');
const multer = require('multer');
const Strings = require('../../../utils/strings');
const path = require('path');
const WorkItem = require('../../../models/WorkItem');
const User = require('../../../models/User');
const Tag = require('../../../models/Tag');
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
        cb(null, './public/dist/uploads/');
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
 * Get Portfolio Summary
 */
router.get('/summary/:offset', function (req, res, next) {
    const offset = req.params.offset;

    User.count({
        portfolio: {
            $not: {
                $size: 0
            }
        }
    }, (err, cnt) => {
        User.find({
            portfolio: {
                $not: {
                    $size: 0
                }
            }
        }, ['-password', '-passwordChangeDate', '-passwordResetTokenDate'], {
            skip: (offset - 1) * 8,
            limit: 8
        }).populate('portfolio', null, null, {
            sort: {
                rating: -1
            },
            limit: 2,
        }).exec((err, portfolios) => {
            if (err) {
                return next(err);
            }
            return res.json({
                count: cnt,
                results: portfolios
            });
        });
    });

});

/**
 * Get List of Tags
 */

router.get('/tags', function (req, res, next) {
    Tag.find({}, ['-_id'], (err, data) => {
        if (err) {
            return next(err);
        }

        if (!data) {
            return next('No Data.');
        }
        const result = [];
        data.forEach((tag) => {
            result.push(tag.name);
        });
        return res.json({
            results: result
        });
    });
});

/**
 * Get Work Items With a Particular Tag
 */

router.get('/tag/:tag', function (req, res, next) {
    WorkItem.find({})
        .populate({
            path: 'tags',
            select: 'name -_id'
        })
        .exec((err, data) => {
            return res.json({
                results: data.filter((itm) => {
                    let hasIt = false;
                    itm.tags.forEach((tg) => {
                        if (tg.name === req.params.tag) {
                            hasIt = true;
                        }
                    });
                    return hasIt;
                })
            });
        });

});

/**
 * Get Work Item Details
 */
router.get('/view/:id', function (req, res, next) {
    WorkItem.findOne({
        _id: req.params.id
    }).populate('tags').exec((err, result) => {
        if (err) {
            return next(err);
        }
        if (!result) {
            return next('Project Not Found.');
        }
        return res.json(result);
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
        tags = req.body.tags,
        coverImage = req.file;

    let errors = [];

    if (!title) {
        errors.push(Strings.EMPTY_TITLE);
    }

    if (!description) {
        errors.push(Strings.EMPTY_PDESC);
    }

    if (!liveDemo && !githubRepo && !coverImage) { // User left all three fields empty
        errors.push(Strings.EMPTY_WORK);
    }

    if (liveDemo && !validateUrl(liveDemo)) {
        errors.push(Strings.BAD_DEMO);
    }

    if (githubRepo && !validateUrl(githubRepo)) {
        errors.push(Strings.BAD_REPO);
    }

    if (!tags) {
        errors.push('You must include at least one tag.');
    }

    if (errors.length > 0) {
        return next(errors);
    }


    createTags(tags, (newTags) => {
        const student = req.user;
        const portfolioItem = new WorkItem({
            title,
            description,
            coverImage: coverImage ? coverImage.filename : undefined,
            liveDemo,
            githubRepo,
            tags: newTags
        });

        portfolioItem.save((err, newItem) => { // Save the created Item
            if (err) {
                return next(err);
            }
            student.portfolio.push(newItem);
            student.save((err) => {
                if (err) {
                    return next(err);
                }

                res.json({
                    message: Strings.WORK_ADDED
                });
            });
        });
    });


});


/**
 * Seperate Tags by Comma
 */
let createTags = (tags, cb) => {
    const tagsSeperated = tags.split(',').map((item) => item.trim());
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

/*
    Regex for URL validation
    https://gist.github.com/dperini/729294
*/

let validateUrl = function (url) {
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(url);
};

/**
 * Error Handling Middleware
 */
router.use(function (err, req, res, next) {
    return res.status(400).json({
        message: handleError(err)
    });
});

const handleError = err => {
    if (err instanceof Array) {
        return err;
    }
    return [err.toString()];
};

module.exports = router;