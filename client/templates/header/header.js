/**
 * Created by Caciano on 4/3/2017.
 */

import Club from "/both/collections/club";

Template.header.helpers({
    enrolled: () => {
        return Meteor.user().enrolled;
    },
    adminOf: () => {
      let clubs = Club.find({admin: Meteor.userId()}, {fields: {"Club Name": 1}}).fetch();
      let array = [];
      for(let i = 0; i < clubs.length; i++)
          array.push( clubs[i]["Club Name"]);
      return array;
    }
});

Template.header.events({
    "click .colapseNavBtn a": () => {
        if($(window).width() < 768) {
            $("#toggle-button").click();
        }
    },
    "click .colapseNavBtn #updateclub": () => {
      let clubs = Club.find({admin: Meteor.userId()}, {fields: {"Club Name": 1, _id: 0}}).fetch();
      console.log(clubs);
    }
});
