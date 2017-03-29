/**
 * Created by Caciano on 3/29/2017.
 */

FlowRouter.route(["/", "/home"], {
    action: () => {
        FlowLayout.render("layout", {main: ""});
    }
});

FlowRouter.route("/signin", {
    action: () => {
        FlowLayout.render("layout", {main: "signin"});
    }
});