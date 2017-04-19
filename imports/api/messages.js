import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('chatmessages');

var tMsg = "Loading Collection chatmessages"
console.log(Messages);