/**
 * Created by Caciano on 4/7/2017.
 */
import Club from "/both/collections/club";

Template.updateclub.onCreated(function () {
    this.err = new ReactiveVar("");
    this.event = new ReactiveVar(false);
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
    loop: (num) => {
        let array = [];
        for(let i = 0; i < num; i++)
            array.push({
                hour: i + 1,
                min: i * 10,
                year: () => {
                    let date = new Date();
                    return date.getFullYear() + i;
                },
                month: i + 1,
                day: i + 1
            });
        return array;
    },
    err: function() {
        return Template.instance().err.get();
    },
    isEvent: () => {
        return Template.instance().event.get();
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
    "click #eventButton button": (event, template) => {
        $("#eventButton").css("display", "none");
        $("#cancelEvent").css("display", "inherit");
        template.event.set(true);
    },
    "click #cancelEvent button": (event, template) => {
        $("#cancelEvent").css("display", "none");
        $("#eventButton").css("display", "inherit");
        template.event.set(false);
    },
    "submit #eventContainer form": (Event, template) => {
        Event.preventDefault();
        const values = $("form input, textarea, select").map(function(){
            return $(this).val();
        }).get();

        let keywords = [];
        for(let i = 0; i < 9; i++)
            keywords.push(values[i]);
        const event = {
            title: values[0],
            info: values[1],
            location: values[2],
            time: values[4] === "0"  ? `${values[3]}:00${values[5]}` : `${values[3]}:${values[4]}${values[5]}`,
            date: {
                year: values[6],
                month: values[7],
                day: values[8]
            }
        };

        let date = new Date(event.date.year, event.date.month - 1, event.date.day);
        let now = new Date();
        now.setHours(0,0,0,0);

        if(date.getMonth() != event.date.month - 1)
        {
            template.err.set("You entered an invalid date!");
            document.getElementById("updateclubAlerts").style.display = "inherit";
        }else if(date < now)
        {
            template.err.set("This date already passed!");
            document.getElementById("updateclubAlerts").style.display = "inherit";
        }else
            Meteor.call("addEvent", FlowRouter.getQueryParam("club"), event, (err, result) => {
                if(err) {
                    template.err.set(err);
                    document.getElementById("updateclubAlerts").style.display = "inherit";
                }else
                    FlowRouter.go("/home");
            });
    },
    "submit #clubContainer form": (event, template) => {
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
