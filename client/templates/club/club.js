import Club from "/both/collections/club";

Template.club.onCreated(function () {
    this.subscribe("enrolled");
});

Template.club.helpers({
    enrolled: () => {
        return Meteor.user().enrolled.includes(FlowRouter.getQueryParam("clubname"));
    },
    name: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {"Club Name": 1}})["Club Name"];
    },
    description: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {description: 1}}).description;
    }
});

Template.club.events({
    "click #enroll button": (event, template) => {
        Meteor.call("Enroll", FlowRouter.getQueryParam("clubname"));
    },
    "click #unenroll button": (event, template) => {
        Meteor.call("Unenroll", FlowRouter.getQueryParam("clubname"));
    }
});