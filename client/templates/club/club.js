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
    },
    clubs: () => {
        let events = Club.findOne({"Club Name": FlowRouter.getQueryParam("clubname")}, {fields: {event: 1}}).event;
        if(!events) return null;

        events.sort((a, b) => {
            let yearA = a.date.year, yearB = b.date.year;
            let monthA = a.date.month, monthB = b.date.month;
            let dayA = a.date.day, dayB = b.date.day;
            return yearA < yearB ? -1 : yearA > yearB ? 1 : monthA < monthB ? -1 : monthA > monthB ? 1 : dayA < dayB ? -1 : dayA > dayB ? 1 : 0;
        });
        return events;
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
