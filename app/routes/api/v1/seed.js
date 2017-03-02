const express = require('express');
const User = require('../../../models/User');
const Tag = require('../../../models/Tag');
const WorkItem = require('../../../models/WorkItem');
const studentData = require('../../../seed/students.json');
const workItemData = require('../../../seed/items.json');
const tagsData = require('../../../seed/tags.json');

require('dotenv').config();
const router = express.Router();

/**
 * Seed database with data
 * DEBUG MODE ONLY
 */

router.get('/', function (req, res) {
    if (!process.env.DEBUG_MODE) {
        return res.redirect('/');
    }
    let cnt = 0;

    createWorkItems(workItemData, (workItems) => {
        studentData.forEach((student) => {
            student.email = student.email.toLowerCase();
            let rand = Math.floor(Math.random() * (workItems.length));
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

/**
 * Generate Tags from JSON
 */

let createTags = (tagsSeperated, cb) => {
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
* Generate Work Items from JSON
*/

let createWorkItems = (items, cb) => {
    let callBacksLeft = items.length;
    const newItems = [];
    createTags(tagsData.tags, (tags) => {
        items.forEach((itm) => {
            const randNum = Math.floor((Math.random() * 4) + 1);
            const randTag = Math.floor((Math.random() * (tags.length - randNum)));
            const itemTags = [];
            for (let x = 0; x < randNum; x++) {
                itemTags.push(tags[randTag + x]);
            }
            itm.tags = itemTags;
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
    });
};

module.exports = router;