/**
 * Created by Caciano on 4/5/2017.
 */

date = new Date();
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

Template.calendar.onCreated(function () {
    this.newMonth = new ReactiveVar(months[date.getMonth()]);
});

Template.calendar.helpers({
    loop: (count) => {
        let array = [];
        for(let i = 0; i < count; i++)
            array.push({});
        return array;
    },
    month: function() {
        return Template.instance().newMonth.get();
    }
});

Template.calendar.events({
    "click #left": function(event, template) {
        date.setMonth(date.getMonth() - 1);
        template.newMonth.set(months[date.getMonth()]);
        $('table td').off();
        fillCalendar(date);
    },
    "click #right": function(event, template) {
        date.setMonth(date.getMonth() + 1);
        template.newMonth.set(months[date.getMonth()]);
        $('table td').off();
        fillCalendar(date);
    }
});

Template.calendar.onRendered(() => {
    fillCalendar(date);
});

function fillCalendar(date)
{
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    for (var row = 1, day = 1, index = 0; row < 7; row++)
        for (let cell = 0; cell < 7; cell++, index++) {
            if (firstDay <= index && day <= lastDay) {
                let td = document.getElementById("table").rows[row].cells[cell];
                td.innerText = "";
                $(td).append(day++);
                $(td).css("background-color", "#dcecef");
                $(td).hover(function () {
                    $(td).css("background-color", "#b1eded");
                }, function () {
                    $(td).css("background-color", "#dcecef");
                });
            }
            else {
                let td = document.getElementById("table").rows[row].cells[cell];
                td.innerText = "";
                $(td).css("background-color", "#dbdbd6");
            }
        }
}