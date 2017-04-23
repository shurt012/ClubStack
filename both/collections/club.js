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
        max: 300
    },
    admin: {
        type: String,
        autoValue: () => {
            return Meteor.userId();
        }
    },
    contact: {
        type: Object,
        label: "contact info"
    },
    "contact.name": {
        type: String,
        max: 50
    },
    "contact.email": {
        type: String,
        regEx: /.*@fiu\.edu$/,
        max: 50
    },
    "contact.phone": {
        type: String,
        regEx: /\d\d\d-\d\d\d-\d\d\d\d/,
        min: 12,
        max: 12
    },
    event: {
        type: Array,
        label: "event",
        optional: true
    },
    "event.$": {
        type: Object
    },
    "event.$.title": {
        type: String,
        max: 60,
    },
    "event.$.info": {
        type: String,
        max: 300
    },
    "event.$.location": {
        type: String,
        max: 100
    },
    "event.$.time": {
        type: String,
        regEx: /(^1[0-2]|^[1-9]):[0-5]\d(A|P)M$/, //matches 1:30AM or 12:59PM format, i.e length is 6 or 7
        min: 6,
        max: 7
    },
    "event.$.date": {
        type: Object
    },
    "event.$.date.year": {
        type: Number,
        min: () => {
            return new Date().getFullYear() - 1;
        },
        max: () => {
            return new Date().getFullYear() + 1;
        }
    },
    "event.$.date.month": {
        type: Number,
        min: 1,
        max: 12
    },
    "event.$.date.day": {
        type: Number,
        min: 1,
        max: 31
    },
    createdAt: {
        type: Date,
        autoValue: () => {
            return new Date();
        }
    }
}, { tracker: Tracker }));

module.exports = Club;