/**
 * Created by Edward on 4/19/2017.
 */

import {SimpleChat} from 'meteor/cesarve:simple-chat/config';
import Club from "../../../both/collections/club";

Template.messages.onCreated(function(){
    this.clubs = new ReactiveVar([]);
    this.state = new ReactiveVar(true);
    this.clubsPresent = new ReactiveVar(false);
});

Template.messages.helpers({
    chatname:()=> {
       return FlowRouter.getQueryParam("club");
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
    "click #allClubs": function (event, template) {
        event.preventDefault();
        template.state.set(false);
        let clubs = Club.find({}, {fields: {"Club Name": 1, _id: 0}}).fetch();
        $("#searchInput").val("");
        clubs.length > 0 ? (template.clubs.set(clubs), template.clubsPresent.set(true)) : (template.clubs.set([]), template.clubsPresent.set(false));
        $("#searchResults").css("display", "inline");
    },
     "click #clubParam a": (event) => {
         location.reload();
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