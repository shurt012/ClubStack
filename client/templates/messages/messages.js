/**
 * Created by Edward on 4/19/2017.
 */


import { Template } from 'meteor/templating';
import { Messages } from '../../../imports/api/messages.js';


import './messages.html';

Template.messages.helpers({
    
   chatmessages() {
       console.log("Finding messages")
     return Messages.find();
   },
   
   chatname:()=> {
       let clubname = this.params.query.club;
       
       console.log(clubname);
       return clubname;
   },
   /*
  chatmessages: [
    { text: 'Hey there,' },
    { text: 'This is a test of data that would be stored in collections' },
    { text: 'Currently ironing out some issues..' },
  ],  
    */
});

 Template.messages.events({
   'submit .new-message'(event) {
     // Prevent default browser form submit
     event.preventDefault();
     // Get value from form element
     const target = event.target;
     const text = target.text.value;
     
     // Insert a message into the collection
     Messages.insert({
       text,
       createdAt: new Date(), // current time
 	 //user information
     //TODO: Get user account details
         owner: Meteor.userId(), 
         username:Meteor.user().username,
     });
     
     //This does not work..
     /*
     Messages.allow({
         insert: function(text) {
             return true;
         }
         
     });
     */
     
     // Clear form
     target.text.value = '';
     // scroll to last message
     $('.panel-body').scrollTop($('.media-list').height())
	},
 });