/**
 * Created by Caciano on 4/7/2017.
 */
import Club from "/both/collections/club";
import { ReactiveVar } from 'meteor/reactive-var';

Template.admin.onCreated(function () {
    this.err = new ReactiveVar("");
});

Template.admin.onRendered( () => {
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

Template.admin.helpers({
    err: function() {
        return Template.instance().err.get();
    }
});

Template.admin.events({
    "submit form": (event, template) => {
        event.preventDefault();

        const values = $("form input, textarea").map(function(){
            return $(this).val();
        }).get();

        let keywords = [];
        for(var i = 2; i <= 7; i++)
            if(values[i] != "")
                keywords.push(values[i].toUpperCase());

        const club = {
            "Club Name": values[0],
            description: values[1],
            keywords: keywords,
            contact: {
                "name": values[8],
                "email": values[9],
                "phone": values[10]
            }
        };
        
        if( Club.findOne({"Club Name": values[0]}) )
        {
            template.err.set("Club Name already exists!");
            console.log(template.err)
            document.getElementById("adminAlerts").style.display = "inherit";
        }else if(keywords.length < 1)
        {
            template.err.set("Must enter at least one keyword!");
            document.getElementById("adminAlerts").style.display = "inherit";
        }
        else
            Meteor.call("insertClub",club, (err, result) => {
                if(err) {
                    template.err.set(err);
                    document.getElementById("adminAlerts").style.display = "inherit";
                }else {
                    Meteor.call("clubOwner");
                    FlowRouter.go("/");
                }
            });
    }
});
