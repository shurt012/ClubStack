/**
 * Created by Caciano on 4/12/2017.
 */

import Club from "/both/collections/club";

Meteor.publish("ClubNames", function(){
    return Club.find({}, {fields: {"Club Name": 1, keywords: 1, event: 1}});
});
