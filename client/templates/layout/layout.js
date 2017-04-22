/**
 * Created by Caciano on 4/12/2017.
 */

Template.layout.onCreated( function(){
    this.subscribe("ClubNames");
    this.subscribe("enrolled");
});