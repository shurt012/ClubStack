/**
 * Created by Caciano on 4/4/2017.
 */

Accounts.validateNewUser( (user) => {
    return (/.*@fiu\.edu$/).test(user.emails[0].address) ? true : (() => {throw new Meteor.Error("Invalid Email", "Please use an FIU email.")});
});

Meteor.methods({
    AssignRole: function() {
        Roles.addUsersToRoles(this.userId, "defaultUser");
    }
});