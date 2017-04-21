/**
 * Created by Edward on 4/19/2017.
 */


import { Template } from 'meteor/templating';
import { Messages } from '../../../both/collections/messages.js';
import Club from "../../../both/collections/club";

import './messages.html';


Template.messages.onCreated(function(){
    this.clubs = new ReactiveVar([]);
    this.state = new ReactiveVar(true);
    this.clubsPresent = new ReactiveVar(false);
});

Template.messages.helpers({
      
   chatmessages() {
       console.log("Finding messages")
     return Messages.find();
   },
   
   chatname:()=> {
       let clubname = FlowRouter.getQueryParam("club");
       return clubname;
   },
   
    getClubs: () => {
        let state = Template.instance().state.get();
        let query = Template.instance().clubs.get();

        if(state)
            return query.length > 0 ? getNames(query) : ["No clubs match this keyword."];
        else
            return query.length > 0 ? getNames(query) : ["No clubs have been created yet."];
    },
    
    clubsPresent: () => {
        return Template.instance().clubsPresent.get();
    },   
    
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
     
     
     // Clear form
     target.text.value = '';
     // scroll to last message
     $('.panel-body').scrollTop($('.media-list').height())
	},

    "click #allClubs": function (event, template) {
        event.preventDefault();
        template.state.set(false);
        let clubs = Club.find({}, {fields: {"Club Name": 1, _id: 0}}).fetch();
        $("#searchInput").val("");
        clubs.length > 0 ? (template.clubs.set(clubs), template.clubsPresent.set(true)) : (template.clubs.set([]), template.clubsPresent.set(false));
        $("#searchResults").css("display", "inline");
    },
    "click, dblclick, keydown, keyup, keypress": (event) => {
        $("#searchResults").css("display", "none");
    },         
 });
 
function getNames(object)
{
    let array = [];
    for(let i = 0; i < object.length; i++)
        array.push( object[i]["Club Name"]);
    return array;
}