/**
 * Created by Caciano on 4/4/2017.
 */

Accounts.onCreateUser( (options, user) => {
    if(!user.profile) user.profile = {};
    user.profile.firstname = options.firstname;
    user.profile.lastname = options.lastname;
    return user;
});

Accounts.validateNewUser( (user) => {
    return (/.*@fiu\.edu$/).test(user.emails[0].address) ? true : (() => {throw new Meteor.Error("Invalid Email", "Please use an FIU email.")});
});
Accounts.validateNewUser( (user) => {
    return (/.*@fiu\.edu$/).test(user.emails[0].address) ? true : (() => {throw new Meteor.Error("Invalid Email", "Please use an FIU email.")});
});

Meteor.methods({
    AssignRole: function() {
        Roles.addUsersToRoles(this.userId, "defaultUser");
    }
});