/**
 * Created by Caciano on 4/3/2017.
 */

Template.signin.events({
    'submit form':function(evt){
        evt.preventDefault();
        document.getElementById("alerts").style.display = "none";
        const email = evt.target.signinEmail.value;
        const password = evt.target.signinPass.value;
        Meteor.loginWithPassword(email,password, (err) => {
            if(err) {
                document.getElementById("alerts").innerHTML = "<div><strong>Log in credentials is incorrect! Please try again.</strong></div>";
                document.getElementById("alerts").style.display = "inherit";
            }else
                FlowRouter.go("/");
        });
    }
});