/**
 * Created by Caciano on 4/4/2017.
 */

Accounts.validateNewUser( (user) => {
    return (/.*@fiu\.edu$/).test(user.emails[0].address);
});

Meteor.methods({
    AssignRole: function() {
        Roles.addUsersToRoles(this.userId, "defaultUser");
    }
});