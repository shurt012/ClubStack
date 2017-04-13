/**
 * Created by Caciano on 4/3/2017.
 */

Template.header.helpers({
    enrolled: () => {
        let query = Meteor.users.find({_id: Meteor.userId()}, {fields: {enrolled: 1}}).fetch();
        return query[0].enrolled;
    }
});

Template.header.events({
    "click .colapseNavBtn a": () => {
        if($(window).width() < 768) {
            $("#toggle-button").click();
        }
    }
});