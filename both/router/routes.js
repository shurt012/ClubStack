/**
 * Created by Caciano on 3/29/2017.
 */

function loggedIn()
{
    if(!Meteor.userId()) FlowRouter.go("/home");
}
function loggedOut()
{
    if(Meteor.userId()) FlowRouter.go("/home");
}

FlowRouter.route(["/", "/home"], {
    action: () => {
        FlowLayout.render("layout", {main: "home"});
    }
});
FlowRouter.route("/club", {
    action: () => {
        FlowLayout.render("layout", {main: "club"});
    }
});

//======================================================================================================================

FlowRouter.route("/signin", {
    triggersEnter: loggedOut,
    action: () => {
        FlowLayout.render("layout", {main: "signin"});
    }
});
FlowRouter.route("/register", {
    triggersEnter: loggedOut,
    action: () => {
        FlowLayout.render("layout", {main: "register"});
    }
});

//======================================================================================================================

FlowRouter.route("/signout", {
    triggersEnter: loggedIn,
    action: () => {
        Meteor.logout();
        FlowRouter.go("/home");
    }
});
FlowRouter.route("/admin", {
    triggersEnter: loggedIn,
    action: () => {
        FlowLayout.render("layout", {main: "admin"});
    }
});
FlowRouter.route("/messages", {
    triggersEnter: loggedIn,
    action: () => {
        FlowLayout.render("layout", {main: "messages"});
    }
});
FlowRouter.route("/chat", {
    triggersEnter: loggedIn,
    action: () => {
        FlowLayout.render("layout", {main: "chat"});
    }
});
FlowRouter.route("/calendar", {
    triggersEnter: loggedIn,
    action: () => {
        FlowLayout.render("layout", {main: "calendar"});
    }
});
