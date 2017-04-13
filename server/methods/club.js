/**
 * Created by Caciano on 4/12/2017.
 */

import Club from "/both/collections/club";

Meteor.methods({
    clubOwner: function() {
        const club = Club.findOne( {admin: this.userId} );
        Meteor.users.update({_id: this.userId}, { $push: {clubs: club["Club Name"]} });
    },
    insertClub: function(doc) {
        Club.insert(doc);
    }
});