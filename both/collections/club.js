/**
 * Created by Caciano on 4/7/2017.
 */

import SimpleSchema from 'simpl-schema';

const Club = new Mongo.Collection("club");

Club.attachSchema(new SimpleSchema({
    "Club Name": {
        type: String,
        index: true,
        unique: true,
        label: "Name",
        max: 50
    },
    keywords: {
        type: Array,
        minCount: 1,
        maxCount: 6
    },
    "keywords.$": {
        type: String,
        max: 50
    },
    description: {
        type: String,
        max: 500
    },
    admin: {
        type: String,
        autoValue: () => {
            return Meteor.userId();
        }
    },
    contact: {
        type: Object,
        label: "contact info",
        optional: true
    },
    "contact.name": {
        type: String,
        max: 50,
        optional: true,
    },
    "contact.email": {
        type: String,
        regEx: /.*@fiu\.edu$/,
        max: 50,
        optional: true,
    },
    "contact.phone": {
        type: String,
        regEx: /\d\d\d-\d\d\d-\d\d\d\d/,
        min: 12,
        max: 12,
        optional: true,
    },
    event: {
        type: Array,
        label: "event",
        optional: true
    },
    "event.title": {
        type: String,
        max: 60,
    },
    "event.info": {
        type: String,
        max: 300
    },
    "event.location": {
        type: String,
        max: 100,
        optional: true
    },
    "event.date": {
        type: Object,
    },
    "event.date.year": {
        type: Number
    },
    "event.date.month": {
        type: Number
    },
    "event.date.day": {
        type: Number
    },
    createdAt: {
        type: Date,
        autoValue: () => {
            return new Date();
        }
    }
}, { tracker: Tracker }));

module.exports = Club;