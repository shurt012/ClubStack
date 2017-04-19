/**
 * Created by Caciano on 4/9/2017.
 */

import SimpleSchema from 'simpl-schema';

const Chat = new Mongo.Collection("chat");

Chat.attachSchema(new SimpleSchema({
    club: {
        type: String,
        index: true,
        unique: true,
        label: "Club Name",
        max: 50
    },
    chat: {
        type: Array,
    },
    "chat.$": {
        type: String,
        min: 1,
        max: 200,
        optional: true
    },
    admin: {
        type: String,
        autoValue: () => {
            return Meteor.userId();
        }
    },
    createdAt: {
        type: Date,
        autoValue: () => {
            return new Date();
        }
    }
} ,{ tracker: Tracker }));

module.exports = Chat;