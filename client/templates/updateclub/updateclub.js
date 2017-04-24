/**
 * Created by Caciano on 4/7/2017.
 */
import Club from "/both/collections/club";

Template.updateclub.onCreated(function () {
    this.err = new ReactiveVar("");
});

Template.updateclub.onRendered( function() {
    const email = document.getElementsByClassName("contactEmail")[0];
    const phone = document.getElementsByClassName("contactPhone")[0];

    function validatePhone() {
        if(phone.value === "" || phone.value == null)
            phone.setCustomValidity("");
        else if (!(/\d\d\d-\d\d\d-\d\d\d\d/).test(phone.value) || phone.value.length != 12)
            phone.setCustomValidity("Phone number must be in xxx-xxx-xxxx format.");
        else
            phone.setCustomValidity("");
    }

    function validateEmail() {
        if(email.value === "" || email.value == null)
            email.setCustomValidity("");
        else if (!(/.*@fiu\.edu$/).test(email.value))
            email.setCustomValidity("Must use an FIU email address!");
        else
            email.setCustomValidity("");
    }

    phone.onchange = validatePhone;
    email.onchange = validateEmail;
});

Template.updateclub.helpers({
    err: function() {
        return Template.instance().err.get();
    },
    Url: () => {
        return FlowRouter.getQueryParam("club");
    },
    description: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {description: 1}}).description;
    },
    keyword1: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[0];
        return keywords ? keywords : "";
    },
    keyword2: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[1];
        return keywords ? keywords : "";
    },
    keyword3: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[2];
        return keywords ? keywords : "";
    },
    keyword4: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[3];
        return keywords ? keywords : "";
    },
    keyword5: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[4];
        return keywords ? keywords : "";
    },
    keyword6: () => {
        let keywords = Club.find({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {keywords: 1}}).fetch()[0].keywords[5];
        return keywords ? keywords : "";
    },
    name: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.name": 1}}).contact.name;
    },
    email: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.email": 1}}).contact.email;
    },
    phone: () => {
        return Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.phone": 1}}).contact.phone;
    }
});

Template.updateclub.events({
    "submit form": (event, template) => {
        event.preventDefault();
        const values = $("form input, textarea").map(function(){
            return $(this).val();
        }).get();

        let keywords = [];
        for(var i = 1; i <= 6; i++) {
            if (values[i] != "")
                keywords.push(values[i].toUpperCase());
            else if($("#placeholders input[name='key"+i+"']").attr("placeholder"))
                keywords.push($("#placeholders input[name='key"+i+"']").attr("placeholder"));
        }

        const club = {
            "Club Name": FlowRouter.getQueryParam("club"),
            description: (values[0]) ? values[0] : Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {description: 1}}).description,
            keywords: keywords,
            contact: {
                "name": (values[7]) ? values[7] : Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.name": 1}}).contact.name,
                "email": (values[8]) ? values[8] : Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.email": 1}}).contact.email,
                "phone": (values[9]) ? values[9] : Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}, {fields: {"contact.phone": 1}}).contact.phone
            }
        };

        if( Club.findOne({"Club Name": FlowRouter.getQueryParam("club")}) )
        {
            Meteor.call("updateClub",club, (err, result) => {
                if(err) {
                    template.err.set(err);
                    document.getElementById("updateclubAlerts").style.display = "inherit";
                }else {
                    Meteor.call("clubOwner");
                    FlowRouter.go("/");
                }
            });
        }
    }
});
