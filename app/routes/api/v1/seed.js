const express = require('express');
const mongoose = require('mongoose');
const User = require('../../../models/User');
const WorkItem = require('../../../models/WorkItem');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;
const DB_URL = process.env.DB_URL;

const router = express.Router();

/**
 * DEV MODE DATABASE SEED
 */

router.get('/', function (req, res) {
    if (!process.env.DEBUG_MODE) {
        return res.redirect('/');
    }

    const studentData = require('../../../seed/students.json');
    const workItemData = require('../../../seed/items.json');
    const User = require('../../../models/User');
    const Tags = require('../../../seed/tags.json');
    let cnt = 0;

    createTags(Tags.tags, (tags) => {
        createWorkItems(workItemData, (workItems) => {
            studentData.forEach((student) => {
                let rand = Math.floor(Math.random() * (workItems.length));
                let tagRand = Math.floor(Math.random() * (tags.length));

                workItems[rand].tags = [tags[tagRand]];
                workItems[rand].save((err) => {
                    student.portfolio = [workItems[rand]];
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
});

/**
 * Seperate Tags by Comma
 */
let createTags = (tagsSeperated, cb) => {
    const Tag = require('../../../models/Tag');
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

let createWorkItems = (Items, cb) => {
    let callBacksLeft = Items.length;
    const newItems = [];
    Items.forEach((itm) => {
        new WorkItem(itm).save((err, data) => {
            if (err) {
                throw err;
            }
            callBacksLeft--;
            newItems.push(data);
            if (callBacksLeft == 0) {
                return cb(newItems);
            }
        });
    });
};

module.exports = router;