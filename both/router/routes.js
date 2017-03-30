/**
 * Created by Caciano on 3/29/2017.
 */

FlowRouter.route(["/", "/home"], {
    action: () => {
        FlowLayout.render("layout", {main: "home"});
    }
});
FlowRouter.route("/signin", {
    action: () => {
        FlowLayout.render("layout", {main: "signin"});
    }
});
FlowRouter.route("/forum", {
    action: () => {
        FlowLayout.render("layout", {main: "forum"});
    }
});
FlowRouter.route("/register", {
    action: () => {
        FlowLayout.render("layout", {main: "register"});
    }
});