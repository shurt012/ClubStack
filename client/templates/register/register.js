/**
 * Created by Caciano on 4/3/2017.
 */

Template.register.onRendered( () => {
    function validateEmail() {
        if( !(/.*@fiu\.edu$/).test(document.getElementById("signinEmail").value) )
            document.getElementById("signinEmail").setCustomValidity("Must use an FIU email address!");
        else
            document.getElementById("signinEmail").setCustomValidity("");
    }

    function validatePass() {
        if(document.getElementById("signinPass").value != document.getElementById("Confirm").value)
            document.getElementById("Confirm").setCustomValidity("Passwords must match!");
        else
            document.getElementById("Confirm").setCustomValidity("");
    }

    document.getElementById("signinEmail").onchange = validateEmail;
    document.getElementById("Confirm").onchange = validatePass;
    document.getElementById("signinPass").onchange = validatePass;
});

Template.register.events({
    "submit form": (event) => {
        event.preventDefault();
        document.getElementById("alerts").style.display = "none";
        const firstName = event.target.signinFirst.value;
        const lastName = event.target.signinLast.value;
        const email = event.target.signinEmail.value;
        const password = event.target.signinPass.value;
        Accounts.createUser({
            email: email,
            password: password,
            firstname: firstName,
            lastname: lastName
        }, (err) => {
            if(err) {
                document.getElementById("alerts").innerHTML = "<div><Strong>An account with this email already exists!</Strong></div>";
                document.getElementById("alerts").style.display = "inherit";
            }else
            {
                Meteor.call("AssignRole");
                FlowRouter.go("/");
            }
        });
    }
});

