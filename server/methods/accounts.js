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
    return (/.*@fiu\.edu$/).test(user.emails[0].address) ? true : (() => {throw new Meteor.Error("Invalid Email", "Please use an FIU email.")});
});

Meteor.methods({
    Enroll: function (club){
        if(!Meteor.user().enrolled.includes(club))
            Meteor.users.update({_id: this.userId}, {$push: {enrolled: club}});
    },
    Unenroll: function (club) {
        let update = Meteor.user().enrolled;
        let index = 0;
        if(update.includes(club))
            do{
                if(update[index] == club) update.splice(index, 1);
            }while(update[index] != club && index++ < update.length);
        Meteor.users.update({_id: this.userId}, {$set: {enrolled: update}});
    }
});
