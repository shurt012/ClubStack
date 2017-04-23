/**
 * Created by Caciano on 4/12/2017.
 */

import Club from "/both/collections/club";

Meteor.methods({
    clubOwner: function() {
        let updatedArray = [];
        const updatedClubs = Club.find( {admin: this.userId}, {fields: {"Club Name": 1, _id: 0}} ).fetch();
        for(let i = 0; i < updatedClubs.length; i++)
            updatedArray.push(updatedClubs[i]["Club Name"]);

        Meteor.users.update({_id: this.userId}, { $set: {clubs: updatedArray} });
    },
    insertClub: function(doc) {
        Club.insert(doc);
    },
    updateClub: function(doc) {
        Club.update({"Club Name": doc["Club Name"]}, {$set: doc});
    }
});
