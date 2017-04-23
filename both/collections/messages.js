import { Mongo } from 'meteor/mongo';
import {SimpleChat} from 'meteor/cesarve:simple-chat/config';

export const Messages = new Mongo.Collection('chatmessages');
