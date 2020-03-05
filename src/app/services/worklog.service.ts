import { Injectable } from '@angular/core';
import {Worklog} from '../models/worklog';
import {Hours} from '../models/hours';
import {WeekHours} from "../models/weekHours";

@Injectable({
    providedIn: 'root',
})
export class WorklogService {
    numberArray = 0;
    weekMinutes = 0;
    monthMinutes = 0;
    weekHour: Hours;
    monthHour: Hours;
    daysWorked: number = 0;
    weekHoursMonth: WeekHours [] = [];
    tempDate: Date = new Date(2000, 20, 1);
    monthNames: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    public workLogs: Worklog[] = [{
            id: '001',
            name: 'Bjorn Massoels',
            worked: 420,
            description: 'beschrijving',
            date : new Date(2020, 1, 24, 0, 0, 0, 0)
        },
        {
            id: '002',
            name: 'Bjorn Massoels',
            worked: 400,
            description: 'beschrijving',
            date : new Date(2020, 1, 25, 0, 0, 0, 0)
        },
        {
            id: '003',
            name: 'Bjorn Massoels',
            worked: 360,
            description: 'beschrijving',
            date : new Date(2020, 1, 26, 0, 0, 0, 0)
        },
        {
            id: '004',
            name: 'Bjorn Massoels',
            worked: 420,
            description: 'beschrijving',
            date : new Date(2020, 1, 27, 0, 0, 0, 0)
        },
        {
            id: '005',
            name: 'Bjorn Massoels',
            worked: 300,
            description: 'beschrijving',
            date : new Date(2020, 1, 28, 0, 0, 0, 0)
        },
        {
            id: '006',
            name: 'Bjorn Massoels',
            worked: 100,
            description: 'beschrijving',
            date : new Date(2020, 2, 2, 0, 0, 0, 0)
        },
        {
            id: '007',
            name: 'Bjorn Massoels',
            worked: 20,
            description: 'beschrijving',
            date : new Date(2020, 2, 3, 0, 0, 0, 0)
        },
        {
            id: '008',
            name: 'Bjorn Massoels',
            worked: 80,
            description: 'beschrijving',
            date : new Date(2020, 2, 3, 0, 0, 0, 0)
        },
        {
            id: '009',
            name: 'Bjorn Massoels',
            worked: 300,
            description: 'beschrijving',
            date : new Date(2020, 2, 10, 0, 0, 0, 0)
        },
        {
            id: '010',
            name: 'Bjorn Massoels',
            worked: 300,
            description: 'beschrijving',
            date : new Date(2020, 2, 11, 0, 0, 0, 0)
        },
        {
            id: '011',
            name: 'Bjorn Massoels',
            worked: 420,
            description: 'beschrijving',
            date : new Date(2020, 2, 20, 0, 0, 0, 0)
        },
        {
            id: '012',
            name: 'Bjorn Massoels',
            worked: 450,
            description: 'beschrijving',
            date : new Date(2020, 2, 27, 0, 0, 0, 0)
        },
        {
            id: '013',
            name: 'Bjorn Massoels',
            worked: 420,
            description: 'beschrijving',
            date : new Date(2020, 2, 31, 0, 0, 0, 0)
        },
    ];
    public getWorklogs() {
        return this.workLogs;
    }
    public getDaysWorked(){
        return this.daysWorked;
    }
   public calculateMonthHours(year: number, monthNumber: number) {
        this.monthMinutes = 0;
        this.daysWorked = 0;
        const lastDay = new Date(year, monthNumber + 1, 0);
        console.log(lastDay);
        const month = lastDay.getTime() - this.getFirstDayOfMonth(monthNumber).getTime();
        this.tempDate = new Date();
        const diffDays = Math.ceil(month / 86400000) + 1; // days
        console.log('difference in days: ' + diffDays);
        for (let i = 0; i < diffDays; i++) {
            let day = new Date(year, monthNumber, i + 1, 0 , 0 , 0, 0);
           for (const worklog of this.workLogs) {
               if (day.getTime() - worklog.date.getTime() < 86400000 && day.getTime() - worklog.date.getTime() >= 0) {
                   if (this.monthMinutes === 0 || worklog.date.getTime() - this.tempDate.getTime() >= 86400000) {
                       this.tempDate = worklog.date;
                       this.daysWorked++;
                   }
                   this.monthMinutes += worklog.worked;
                   if ( worklog.date.getTime() - this.tempDate.getTime() === 0) {
                       this.tempDate = worklog.date;
                   }
               }
           }
       }
        console.log('month hours : ' + this.monthMinutes);
        const hours = Math.floor(this.monthMinutes / 60);
        const minutes = this.monthMinutes % 60;
        this.monthHour = new Hours(hours, minutes, 0);
        console.log(this.monthHour);
        return this.monthHour;
    }
    public calculateWeekHours() {
        const week = new Date().getTime() - this.getMondayOfWeek(new Date()).getTime();
        const todayZero = new Date();
        todayZero.setHours(0);
        todayZero.setMinutes(0);
        todayZero.setSeconds(0);
        const diffDays = Math.ceil(week / 86400000); // days
        for (let i = 0; i < diffDays; i++) {
            todayZero.setDate(todayZero.getDate() - i);
            for (const worklog of this.workLogs) {
                if (todayZero.getTime() - worklog.date.getTime() < 86400000 && todayZero.getTime() - worklog.date.getTime() > 0) {
                    this.weekMinutes += worklog.worked;
                }
            }
        }
        console.log(this.weekMinutes);
        const hours = Math.floor(this.weekMinutes / 60);
        const minutes = this.weekMinutes % 60;
        this.weekHour = new Hours(hours, minutes, 0);
        return this.weekHour;
    }
    calculateWeekHoursperMonth(month: string , year: number) {
        let monthNumber = this.monthNames.indexOf(month) ;
        this.weekHoursMonth = [];
        let weekArray = this.getWeeksInMonth(monthNumber, year);
        for (let i = 0; i < weekArray.length; i++){
            let date = new Date(year, monthNumber, weekArray[i].start );
            this.weekHoursMonth[i] = new WeekHours(0, new Hours(0,0,0),weekArray[i].start,weekArray[i].end);
            this.weekHoursMonth[i].weekNumber = this.getWeekOfYear(date);
            let minutesWeek = 0;
            for(let j = weekArray[i].start; j <= weekArray[i].end; j++){
                let tempDate = new Date(year, monthNumber, j, 0, 0, 0, 0 );
                for (const worklog of this.workLogs) {
                    if (tempDate.getTime() - worklog.date.getTime() === 0) {
                        minutesWeek += worklog.worked;
                    }
                }
            }
            const hours = Math.floor(minutesWeek / 60);
            const minutes = minutesWeek % 60;
            this.weekHoursMonth[i].hours =  new Hours(hours, minutes, 0);
        }
        console.log(this.weekHoursMonth);
        return this.weekHoursMonth;
    }
    getMondayOfWeek(d) {
        d = new Date(d);
        const day = d.getDay();
        const weekDate = new Date();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        weekDate.setDate(diff);
        weekDate.setHours(0);
        weekDate.setMinutes(0);
        weekDate.setSeconds(0);
        return weekDate;
    }
    getFirstDayOfMonth(monthNumber: number) {
        const date = new Date(new Date().getUTCFullYear(), monthNumber, 1 );
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date;
    }
    getWeeksInMonth(month, year){
        var weeks=[],
            firstDate=new Date(year, month, 1),
            lastDate=new Date(year, month+1, 0),
            numDays= lastDate.getDate();
        console.log(firstDate.getDate()); // Thursday)
        let weekdays = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        var start=1;
        var end=(7-firstDate.getDay())+1;
        console.log(weekdays[firstDate.getDay()]);
        if(weekdays[firstDate.getDay()] === "Sunday"){
            start = 2;
            end = start +6;
        } else if( weekdays[firstDate.getDay()] === "Saturday"){
            start = 3;
            end = start +6;
        }
        while(start<=numDays){
            weeks.push({start:start,end:end});
            start = end + 1;
            end = end + 7;
            if(end>numDays)
                end=numDays;
        }
        for(let i = 0; i < weeks.length ; i++) {
            let date = new Date(year, month, weeks[i].end);
            if(weekdays[date.getDay()] === "Sunday"){
                weeks[i].end -= 2 ;
            }
            if(weekdays[date.getDay()] === "Saturday"){
                weeks[i].end -= 1 ;
            }
        }
        return weeks;
    }
    getWeekOfYear(d: Date){
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
    }
}
