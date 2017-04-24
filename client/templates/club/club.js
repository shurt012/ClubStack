import Club from "/both/collections/club";

Template.club.helpers({
    enrolled: () => {
        return Meteor.user().enrolled.includes(FlowRouter.getQueryParam("clubname"));
    },
    name: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {"Club Name": 1}})["Club Name"];
    },
    description: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {description: 1}}).description;
    },
    admin: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {"contact.name": 1}}).contact.name;
    },
    email: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {"contact.email": 1}}).contact.email;
    },
    phone: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {"contact.phone": 1}}).contact.phone;
    }
});

Template.club.events({
    "click #enroll button": (event, template) => {
        Meteor.call("Enroll", FlowRouter.getQueryParam("clubname"));
    },
    "click #unenroll button": (event, template) => {
        Meteor.call("Unenroll", FlowRouter.getQueryParam("clubname"));
    },
    "click #clubMessage": () => {
        window.location = `messages?club=${FlowRouter.getQueryParam("clubname")}`;
    }
});
