import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Hours} from '../models/hours';
import {WeekHours} from '../models/weekHours';
import {Worklog} from '../models/worklog';
import {AuthService} from '../services/auth.service';
import {WorklogService} from '../services/worklog.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss'],
})
export class TimesheetsComponent implements OnInit {
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  yearToday: number;
  allDataReceived = false;
  monthToday: string;
  monthHours: Hours;
  weekHours: Hours;
  monthHoursReceived = false;
  daysWorked: number;
  minutesPerDay: number;
  worklogsMonth: Worklog[] = [];
  worklogsWeek: Worklog[] = [];
  averageHoursDay: Hours;
  todayDate: Date;
  monthSelected: Date;
  i: number;
  weeksOfMonth;
  selectedDevice ;
  weekHoursMonth: WeekHours[];
  weekHoursMonthTemp: WeekHours[] = [];
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) { }

  ngOnInit() {
    this.todayDate = new Date();
    this.yearToday = this.todayDate.getUTCFullYear();
    this.selectedDevice = this.monthNames[this.todayDate.getMonth()];
    this.i = 0;
    this.weeksOfMonth = this.worklogService.getWeeksInMonth(this.todayDate.getMonth(), this.todayDate.getFullYear());
    console.log(this.weeksOfMonth);
    this.getMonthHours(this.weeksOfMonth);
    // this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.selectedDevice , this.yearToday);
    // this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
   //  this.daysWorked = this.worklogService.getDaysWorked();
   // this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
   // this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0);
  }
  goToWeek(week: WeekHours) {
    this.worklogService.setWeekHours(week);
    this.router.navigate(['/tabs/week']);
  }
  onChange(newValue) {
    this.selectedDevice = newValue;
    this.monthToday = newValue;
    console.log(this.monthNames.indexOf(this.monthToday));
    this.weeksOfMonth = this.worklogService.getWeeksInMonth(this.monthNames.indexOf(this.monthToday), this.todayDate.getFullYear());
    console.log(this.weeksOfMonth);
    this.getMonthHours(this.weeksOfMonth);
   /* this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.monthToday , this.yearToday);
    this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
    this.daysWorked = this.worklogService.getDaysWorked();
    this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
    this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0); */
  }
  getMonthHours(weeksOfMonth) {
    const month = this.monthNames.indexOf(this.selectedDevice);
    const date = moment([this.todayDate.getFullYear(), month]);
    const firstDayOfMonth = moment(date).startOf('month').toDate();
    const lastDayOfMonth = moment(date).endOf('month').toDate();
    this.i = 0;
    this.authService.token.subscribe(x => { if (x) {
      if (x.access_token != null) {
        this.worklogService.getWorkedHours(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice),
            firstDayOfMonth.getDate(), lastDayOfMonth.getDate()).subscribe( x => {
          this.worklogsMonth = x as Worklog[];
          console.log(this.worklogsMonth);
          this.daysWorked = 0;
          let monthMinutes = 0;
          let tempday = new Date(2040, 20, 2);
          let date = new Date();
          for (const day of this.worklogsMonth) {
            monthMinutes += day.worked;
            date = new Date(day.startDate);
            console.log('tempday' + tempday);
            console.log('day' + day.startDate);
            if (tempday.getTime() !== date.getTime()) {
              console.log(tempday.getTime() - date.getTime());
              tempday = date;
              this.daysWorked++;
              console.log(this.daysWorked);
            } else {
            }
          }
          const minutesPerDay = Math.floor(monthMinutes / this.daysWorked);
          this.averageHoursDay = this.worklogService.convertMinutesToHours(minutesPerDay);
          this.monthHours = this.worklogService.convertMinutesToHours(monthMinutes);
          this.monthHoursReceived = true;
        });
        for (const week of weeksOfMonth) {
          const firstDayOfWeek = new Date(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice), week.start);
          const lastDayOfWeek = new Date(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice), week.end);
          this.worklogService.getWorkedHours(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice),
              firstDayOfWeek.getDate(), lastDayOfWeek.getDate()).subscribe( x => {
            this.i++;
            this.worklogsWeek = x as Worklog[];
            console.log(this.worklogsWeek);
            let weekMinutes = 0;
            for (const day of this.worklogsWeek) {
              weekMinutes += day.worked;
            }
            console.log(weekMinutes);
            if (this.worklogsWeek.length !== 0) {
              const weekNumber = moment(this.worklogsWeek[0].startDate).week();
              const hours = Math.floor(weekMinutes / 60);
              const minutes = weekMinutes % 60;
              this.weekHours = new Hours(hours, minutes, 0);
              console.log(this.weekHours);
              console.log('weeknumber= ' + weekNumber);
              console.log(this.weeksOfMonth);
              console.log(this.i);
              console.log(this.weeksOfMonth[this.i - 1].start);
              console.log(this.weeksOfMonth[this.i - 1].end);
              this.weekHoursMonthTemp[this.i] = new WeekHours( weekNumber, this.weekHours, this.weeksOfMonth[this.i - 1].start, this.weeksOfMonth[this.i - 1].end);
              console.log('i = ' + this.i + ' length ' + this.weeksOfMonth.length);
              if (this.i === this.weeksOfMonth.length) {
                console.log(this.worklogsWeek);
                this.monthSelected = new Date(this.worklogsWeek[0].startDate);
                this.worklogService.setMonthSelected(this.monthSelected);
                this.weekHoursMonthTemp.shift();
                this.weekHoursMonthTemp.sort((a, b) => a.weekNumber - b.weekNumber);
                let j = 0;
                for (const week of this.weeksOfMonth) {
                  this.weekHoursMonthTemp[j].startDay = week.start;
                  this.weekHoursMonthTemp[j].endDay = week.end;
                  j++;
                }
                console.log(this.weekHoursMonthTemp);
                this.weekHoursMonth = this.weekHoursMonthTemp;
                this.allDataReceived = true;
              }
            } else {
              console.log(this.weeksOfMonth[this.i - 1]);
              console.log(this.monthNames.indexOf(this.monthToday));
              const date = new Date(2020, this.monthNames.indexOf(this.monthToday), this.weeksOfMonth[this.i - 1].start);
              console.log(date);
              const weekNumber = moment(date).week();
              this.weekHoursMonthTemp[this.i] = new WeekHours( weekNumber, new Hours(0, 0, 0), this.weeksOfMonth[this.i - 1].start, this.weeksOfMonth[this.i - 1].end);
              if (this.i === this.weeksOfMonth.length) {
                console.log(this.worklogsWeek);
                this.monthSelected = new Date(date);
                this.worklogService.setMonthSelected(this.monthSelected);
                console.log(this.weekHoursMonthTemp);
                this.weekHoursMonthTemp.shift();
                this.weekHoursMonthTemp.sort((a, b) => a.weekNumber - b.weekNumber);
                let j = 0;
                for (const week of this.weeksOfMonth) {
                  this.weekHoursMonthTemp[j].startDay = week.start;
                  this.weekHoursMonthTemp[j].endDay = week.end;
                  j++;
                }
                this.weekHoursMonth = this.weekHoursMonthTemp;
                this.allDataReceived = true;
              }
            }

          });
      }
      }
 }
    });
  }
}
