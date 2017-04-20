/**
 * Created by Caciano on 4/4/2017.
 */

Accounts.onCreateUser( (options, user) => {
    if(!user.clubs) user.clubs = [];
    if(!user.enrolled) user.enrolled = [];
    if(!user.profile) user.profile = {};
    user.profile.firstname = options.firstname;
    user.profile.lastname = options.lastname;
    return user;
});

Accounts.validateNewUser( (user) => {
    Meteor.users.update({_id: Meteor.userId}, {$push: {enrolled: "chess"}});
    return (/.*@fiu\.edu$/).test(user.emails[0].address) ? true : (() => {throw new Meteor.Error("Invalid Email", "Please use an FIU email.")});
});


