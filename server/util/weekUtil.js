/**
 * Created by joker on 15/5/19.
 */

global.moment = require('moment');

var endWeekday = 7; // 1 for Monday, 7 for Sunday
var endHour = 21;

var currentWeekOfYear = function() {
    var end = moment().isoWeekday(endWeekday);
    var weekDay = moment().isoWeekday();
    if (weekDay > endWeekday || weekDay == endWeekday && end.hour() >= endHour) {
        end = end.add(7, 'day');
    }
    return end.isoWeekYear() + _.lpad(end.isoWeek(), 2, '0');
};

var lastWeekOfYear = function() {
    var end = moment().isoWeekday(endWeekday);
    end = end.add(-7, 'day');
    var weekDay = moment().isoWeekday();
    if (weekDay > endWeekday || weekDay == endWeekday && end.hour() >= endHour) {
        end = end.add(7, 'day');
    }
    return end.isoWeekYear() + _.lpad(end.isoWeek(), 2, '0');
};

var getDateDiff = function(startDate, endDate) {
    var startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    var endTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
    return Math.abs((startTime - endTime))/(1000*60*60*24);
};

var getClockTime = function(oneDate, clock) {
    return new Date(oneDate.getFullYear(), oneDate.getMonth(), oneDate.getDate(), clock).getTime();
};

exports.lastWeek = lastWeekOfYear;
exports.currentWeek = currentWeekOfYear;
exports.getDateDiff = getDateDiff;
exports.getClockTime = getClockTime;