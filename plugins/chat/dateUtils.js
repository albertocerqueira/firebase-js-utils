/**
 * jQuery DateUtils plugin 1.0
 *
 * @author : Alberto Cerqueira
 * @email : alberto.cerqueira1990@gmail.com
 */
jQuery.dateUtils = (function(){
	var dateUtilsClass = (function(){
		var units = {minute: 60000, hour: 3600000, day: 86400000, month: 2592000000, year: 31536000000};
		
		this.init = (function() {});
		
		this.clone = (function(date) {
			return new Date(date);
		});
		
		this.create = (function(year, month, day) {
			return new Date(year, month, day);
		});
		
		this.createComplete = (function(pattern, year, month, day, hours, minutes, seconds, milliseconds) {
			return new Date(year, month, day, hours, minutes, seconds, milliseconds);
		});
		
		this.getInput = (function(i) {
			var s;
			if (i['dd/mm/yyyy']) {
				s = i['dd/mm/yyyy'].split('/');
				i.day = s[0]; 
				i.month = s[1]; 
				i.year = s[2];
			}
			if (i['mm/dd/yyyy']) {
				s = i['mm/dd/yyyy'].split('/');
				i.month = s[0];
				i.day = s[1]; 
				i.year = s[2];
			}
			if (i['yyyy/mm/dd']) {
				s = i['yyyy/mm/dd'].split('/');
				i.year = s[0];
				i.month = s[1];
				i.day = s[2]; 
			}		
			return {day: parseInt(i.day, 10), month: (parseInt(i.month, 10) - 1), year: parseInt(i.year, 10)};
		});
		
		this.today = (function(f) {
			var date = new Date();
			var d = date.toISOString().split("T")[0].split("-");
			
			var day = d[2] - 1;
			if (f == 'ddmmyyyy') {
				return day + "" + d[1] + "" + d[0];
			} else if (f == 'mmddyyyy') {
				return d[1] + "" + day + "" + d[0];
			} else if (f == 'yyyymmdd') {
				return d[0] + "" + d[1] + "" + day;
			} else if (f == 'dd/mm/yyyy') {
				return day + "/" + d[1] + "/" + d[0];
			} else if (f == 'mm/dd/yyyy') {
				return d[1] + "/" + day + "/" + d[0];
			} else if (f == 'yyyy/mm/dd') {
				return d[0] + "/" + d[1] + "/" + day;
			} else {
				return day + "/" + d[1] + "/" + d[0]; // default
			}
		});
		
		this.time = (function(t) {
			var timestamp = (t != null) ? ((t.timestamp != null) ? t.timestamp : null) : null;
			
			var date = null;
			if (timestamp != null) {
				date = new Date(timestamp);
			} else {
				date = new Date();
			}
			
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if (minute < 10) {
				minute = "0" + minute;
			}
			if (second < 10) {
				second = "0" + second;
			}
			
			return hour + ":" + minute + ":" + second;
		});
		
		
		this.add = (function(i) {
			i.date.setTime(i.date.getTime() + (parseInt(i.value, 10) * units[i.unit]));
		});

		this.addDays = (function(date, days) {
			DateUtils.add({'date': date, 'unit': 'day', 'value': days});
		});
		
		this.addMonths = (function(date, months) {
			DateUtils.add({'date': date, 'unit': 'month', 'value': months});
		});
		
		this.addYears = (function(date, years) {
			DateUtils.add({'date': date, 'unit': 'year', 'value': years});
		});
		
		this.zeroDay = (function(date) {
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			return date;
		});
		
		this.diffDays = (function(date1, date2) {
			var cdate1 = DateUtils.zeroDay(DateUtils.clone(date1)),
				cdate2 = DateUtils.zeroDay(DateUtils.clone(date2)),
				diff = cdate1.getTime() - cdate2.getTime();
			if (diff === 0) {
				return 0;	
			}
			return Math.round(diff / units.day);				
		});
		
		this.getNew = (function(i) {
			var fi = DateUtils.getInput(i);
			return new Date(fi.year, fi.month, fi.day);
		});
		
		this.getFormat = (function(f) {
			var s = "";
			if (f['ddmmyyyy']) {
				s = f['ddmmyyyy'];
			} else if (f['mmddyyyy']) {
				s = f['mmddyyyy'];
			} else if (f['yyyymmdd']) {
				s = f['yyyymmdd'];
			} else if (f['dd/mm/yyyy']) {
				s = f['dd/mm/yyyy'];
			} else if (f['mm/dd/yyyy']) {
				s = f['mm/dd/yyyy'];
			} else if (f['yyyy/mm/dd']) {
				s = f['yyyy/mm/dd'];
			}
			
			var day = s.getDate();
			var month = (s.getMonth() + 1);
			var year = s.getFullYear();
			if (month < 10) {
				month = "0" + month;
			}
			if (day < 10) {
				day = "0" + day;
			}
			
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if (minute < 10) {
				minute = "0" + minutes;
			}
			if (second < 10) {
				second = "0" + minutes;
			}
			
			var d = "";
			if (f['ddmmyyyy']) {
				d = day + "" + month + "" + year;
			} else if (f['mmddyyyy']) {
				d = month + "" + day + "" + year;
			} else if (f['yyyymmdd']) {
				d = year + "" + month + "" + day;
			} else if (f['yyyymmddhhmmss']) {
				d = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
			} else if (f['dd/mm/yyyy']) {
				d = day + "/" + month + "/" + year;
			} else if (f['dd/mm/yyyy hh:mm:ss']) {
				d = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
			} else if (f['mm/dd/yyyy']) {
				d = month + "/" + day + "/" + year;
			} else if (f['mm/dd/yyyy hh:mm:ss']) {
				d = month + "/" + day + "/" + year + " " + hour + ":" + minute + ":" + second;
			} else if (f['yyyy/mm/dd']) {
				d = year + "/" + month + "/" + day;
			}
			return d;
		});
	});
	return new dateUtilsClass();
});

var DateUtils = $.dateUtils();