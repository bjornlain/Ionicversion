import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Hours} from "../models/hours";
import {WorklogService} from "../services/worklog.service";
import {WeekHours} from "../models/weekHours";
import {Worklog2} from "../models/worklog2";
import {AuthService} from "../services/auth.service";
import {Worklog2Service} from "../services/worklog2.service";
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss'],
})
export class TimesheetsComponent implements OnInit {
  monthNames: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  yearToday: number;
  allDataReceived: boolean = false;
  monthToday: string;
  monthHours: Hours;
  weekHours: Hours;
  monthHoursReceived: boolean = false;
  daysWorked: number;
  minutesPerDay: number;
  worklogsMonth: Worklog2[] = [];
  worklogsWeek: Worklog2[] = [];
  averageHoursDay: Hours;
  todayDate: Date;
  monthSelected: Date;
  i: number;
  weeksOfMonth;
  selectedDevice ;
  weekHoursMonth: WeekHours[];
  weekHoursMonthTemp: WeekHours[] = [];
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService, private worklogService2: Worklog2Service) { }

  ngOnInit() {
    this.todayDate = new Date();
    this.yearToday = this.todayDate.getUTCFullYear();
    this.selectedDevice = this.monthNames[this.todayDate.getMonth()];
    this.i = 0;
    this.weeksOfMonth = this.worklogService2.getWeeksInMonth(this.todayDate.getMonth(), this.todayDate.getFullYear());
    console.log(this.weeksOfMonth);
    this.getMonthHours(this.weeksOfMonth);
    // this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.selectedDevice , this.yearToday);
    // this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
   //  this.daysWorked = this.worklogService.getDaysWorked();
   // this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
   // this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0);
  }
  goToWeek(week: WeekHours){
    this.worklogService2.setWeekHours(week);
    this.router.navigate(['/tabs/week']);
  }
  onChange(newValue) {
    this.selectedDevice = newValue;
    this.monthToday = newValue;
   /* this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.monthToday , this.yearToday);
    this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
    this.daysWorked = this.worklogService.getDaysWorked();
    this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
    this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0); */
  }
  getMonthHours(weeksOfMonth){
    let firstDayOfMonth = moment().startOf("month").toDate();
    let lastDayOfMonth = moment().endOf("month").toDate();
    this.authService.token.subscribe(x => { if(x)
      if(x.access_token != null){
        this.worklogService2.getWorkedHours(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice),
            firstDayOfMonth.getDate(), lastDayOfMonth.getDate()).subscribe( x => {
          this.worklogsMonth = x as Worklog2[];
          console.log(this.worklogsMonth);
          this.daysWorked = 0;
          let monthMinutes = 0;
          let tempday = new Date(2040,20,2);
          let date = new Date();
          for(let day of this.worklogsMonth){
            monthMinutes += day.worked;
            date = new Date(day.date);
            console.log("tempday" + tempday);
            console.log("day" + day.date);
            if(tempday.getTime() !== date.getTime()){
              console.log(tempday.getTime() - date.getTime());
              tempday = date;
              this.daysWorked++;
              console.log(this.daysWorked);
            }else{
            }
          }
          let minutesPerDay = Math.floor(monthMinutes / this.daysWorked);
          this.averageHoursDay = this.worklogService2.convertMinutesToHours(minutesPerDay);
          this.monthHours = this.worklogService2.convertMinutesToHours(monthMinutes);
          this.monthHoursReceived = true;
        });
        for(let week of weeksOfMonth){
          let firstDayOfWeek = new Date(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice), week.start);
          let lastDayOfWeek = new Date(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice), week.end);
          this.worklogService2.getWorkedHours(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice),
              firstDayOfWeek.getDate(), lastDayOfWeek.getDate()).subscribe( x => {
            this.i++;
            this.worklogsWeek = x as Worklog2[];
            console.log(this.worklogsWeek);
            let weekMinutes = 0;
            for(let day of this.worklogsWeek){
              weekMinutes += day.worked;
            }
            console.log(weekMinutes);
            let weekNumber = moment(this.worklogsWeek[0].date).week();
            const hours = Math.floor(weekMinutes/ 60);
            const minutes = weekMinutes % 60;
            this.weekHours = new Hours(hours, minutes, 0);
            console.log(this.weekHours);
            console.log("weeknumber= " + weekNumber);
            console.log(this.weeksOfMonth[this.i - 1].start);
            console.log(this.weeksOfMonth[this.i - 1].end);
            this.weekHoursMonthTemp[this.i] = new WeekHours( weekNumber, this.weekHours, this.weeksOfMonth[this.i - 1].start, this.weeksOfMonth[this.i - 1].end);
            console.log("i = " + this.i+ " length " +this.weeksOfMonth.length);
            if(this.i === this.weeksOfMonth.length){
              console.log(this.worklogsWeek);
              this.monthSelected = new Date(this.worklogsWeek[0].date);
              this.worklogService2.setMonthSelected(this.monthSelected);
              this.weekHoursMonthTemp.shift();
              this.weekHoursMonthTemp.sort((a, b) => (a.weekNumber > b.weekNumber) ? 1 : -1);
              this.weekHoursMonth = this.weekHoursMonthTemp;
              this.allDataReceived = true;
            }
          });
      }
      }
    });
  }
}
