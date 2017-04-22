/**
 * Created by Caciano on 4/21/2017.
 */

Meteor.publish("enrolled", function () {
    return Meteor.users.find({_id: this.userId}, {fields: {"enrolled": 1}});
});