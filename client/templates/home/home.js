/**
 * Created by Caciano on 4/12/2017.
 */

import Club from "/both/collections/club";

Template.home.onCreated(function(){
    this.clubs = new ReactiveVar([]);
    this.state = new ReactiveVar(true);
    this.clubsPresent = new ReactiveVar(false);
});

Template.home.events({
    "click #searchButton": function (event, template) {
        event.preventDefault();
        template.state.set(true);
        let clubs = Club.find({keywords: $("#searchInput").val()}, {fields: {"Club Name": 1, _id: 0}}).fetch();
        $("#searchInput").val("");
        clubs.length > 0 ? (template.clubs.set(clubs), template.clubsPresent.set(true)) : (template.clubs.set([]), template.clubsPresent.set(false));
        $("#searchResults").css("display", "inline");
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
        if(event.target.id != "searchButton") $("#searchResults").css("display", "none");
    }
});

Template.home.helpers({
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
    }
});

function getNames(object)
{
    let array = [];
    for(let i = 0; i < object.length; i++)
        array.push( object[i]["Club Name"]);
    return array;
}