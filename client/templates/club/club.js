import { Template } from 'meteor/templating';
import { Messages } from '../../../both/collections/messages.js';
import Club from "../../../both/collections/club";

import './club.html';


Template.club.helpers({
      
   clubname:()=> {
       let clubname = FlowRouter.getQueryParam("clubname");
       
       return clubname;
   },
    
});