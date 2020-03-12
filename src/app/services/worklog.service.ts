import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from "../models/token";
import {Observable, pipe, Subject} from "rxjs";
import {Worklog} from "../models/worklog";
import {AuthService} from "./auth.service";
import {last, tap} from "rxjs/operators";
import {Hours} from "../models/hours";
import * as moment from 'moment';
import {WeekHours} from "../models/weekHours";
import {WorklogSend} from "../models/worklogSend";
import {DayDate} from "../models/dayDate";

@Injectable({
    providedIn: 'root',
})
export class WorklogService {
    private authUrl: string;
    private worklogUrl: string;
    weekHours: WeekHours;
    monthHour: Hours;
    worklogSelected: DayDate;
    private weekSelected: number;
    monthSelected: Date;
    daySelected: Date;
    private workedHoursUrl: string;
    private workedHoursDayUrl: string;
    private createWorklogUrl: string;
    private admin = JSON.stringify({
        email: "bart@codious.io",
        password: "test1234"
    });
    public workLogs: Worklog[] = [];
    private accessToken : string = undefined;
    options = {headers: {'Content-Type': 'application/json'}};
    constructor(private http: HttpClient , private authService: AuthService) {
        this.authUrl = 'http://localhost:4100/api/v1/auth.login';
        this.worklogUrl = 'http://localhost:4100/api/v1/worklogs.monthList';
        this.workedHoursUrl = 'http://localhost:4100/api/v1/worklogs.workedHours';
        this.workedHoursDayUrl = 'http://localhost:4100/api/v1/worklogs.workedHoursDay';
        this.createWorklogUrl = 'http://localhost:4100/api/v1/worklogs.create';
        this.authService.token.subscribe(x => {
            if(x) this.accessToken = x.access_token;
        });
    }
    getWorkedHours(year: number, month: number , startDay: number, endDay: number){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken,
            'year': year.toString(),
            'month': month.toString(),
            'startDay': startDay.toString(),
            'endDay': endDay.toString()
        })
        return this.http.get(this.workedHoursUrl,{ headers: header }).pipe(tap(x => {
        }));
    }
    getWorkedHoursDay(year: number, month: number , day: number){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken,
            'year': year.toString(),
            'month': month.toString(),
            'day': day.toString()
        })
        return this.http.get(this.workedHoursDayUrl, { headers: header }).pipe(tap(x => {
        }));
    }
    createNewWorklog(project: string, task: string, description: string, user: string, worked: number, startDate: Date, endDate: Date){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        })
        let worklog = new WorklogSend( false, startDate, endDate, description, task, user, worked);
        console.log(worklog);
        return this.http.post(this.createWorklogUrl,  { body: JSON.stringify(worklog) }, {headers: header }).pipe(tap(x => {
        }));
    }
    public convertMinutesToHours(minutes: number){
        const hours = Math.floor(minutes / 60);
        const minutes2 = minutes % 60;
        this.monthHour = new Hours(hours, minutes2, 0);
        return this.monthHour;
    }
    getWeeksInMonth(month, year){
         let weeks = [];
         let date = moment([year, month ]);
         let firstDate= moment(date).startOf("month").toDate();
         let lastDate= moment(date).endOf("month").toDate();
         let numDays= lastDate.getDate();
         console.log(lastDate); // Thursday)
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
    public getWeekHours(): WeekHours{
        return this.weekHours;
    }
    public setWeekHours(weekHours: WeekHours){
        this.weekHours = weekHours;
    }
    public setMonthSelected (date: Date){
        this.monthSelected = date;
    }
    public getMonthSelected(): Date{
        return this.monthSelected;
    }
    public setDaySelected(date:Date){
        this.daySelected = date;
    }
    public getDaySelected(): Date{
        return this.daySelected;
    }
    public getWeekSelected(): number {
        return this.weekSelected;
    }
    public setWeekSelected(value: number) {
        this.weekSelected = value;
    }
    public setWorklogSelected(dayDate: DayDate){
        this.worklogSelected = dayDate;
    }
    public getWorklogSelected(): DayDate{
        return  this.worklogSelected;
    }
}
