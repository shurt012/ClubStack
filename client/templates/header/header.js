/**
 * Created by Caciano on 4/3/2017.
 */

Template.header.helpers({
    enrolled: () => {
        return Meteor.user().enrolled;
    }
});

Template.header.events({
    "click .colapseNavBtn a": () => {
        if($(window).width() < 768) {
            $("#toggle-button").click();
        }
    }
});