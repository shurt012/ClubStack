/**
 * Created by Caciano on 4/3/2017.
 */

Template.header.events({
    "click #nav-target a": () => {
        if($(window).width() < 768) {
            $("#toggle-button").click();
        }
    }
});