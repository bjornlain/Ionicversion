import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Hour} from '../models/hour';
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
  monthHours: Hour;
  weekHours: Hour;
  monthHoursReceived = false;
  daysWorked: number;
  isChoosing: boolean = false;
  minutesPerDay: number;
  worklogsMonth: Worklog[] = [];
  worklogsWeek: Worklog[] = [];
  averageHoursDay: Hour;
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
    this.worklogService.setMonthSelected(this.todayDate);
    console.log(this.worklogService.getMonthSelected());
    this.selectedDevice = this.monthNames[this.todayDate.getMonth()];
    this.monthToday = this.selectedDevice;
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
    let monthDate = new Date(2020, this.monthNames.indexOf(this.monthToday) , 1);
    this.worklogService.setMonthSelected(monthDate);
    this.router.navigate(['/tabs/week']);
  }
  onChange(newValue) {
    this.selectedDevice = newValue;
    this.monthToday = newValue;
    console.log(this.monthNames.indexOf(this.monthToday));
    this.weeksOfMonth = this.worklogService.getWeeksInMonth(this.monthNames.indexOf(this.monthToday), this.todayDate.getFullYear());
    console.log(this.weeksOfMonth);
    this.getMonthHours(this.weeksOfMonth);
  }
  chooseCreate(){
    if (this.isChoosing === false) {
      this.isChoosing = true;
    } else {
      this.isChoosing = false;
    }
  }
  goToCreateWorklogDate(){
    let monthDate = new Date(2020, this.monthNames.indexOf(this.monthToday) , 1);
    this.worklogService.setMonthSelected(monthDate);
    this.isChoosing = false;
    this.router.navigate(['/tabs/createWorklogDate', 'timesheets']);
  }
  goToCreateTask(){
    this.isChoosing = false;
    this.router.navigate(['/tabs/createTask', 'timesheets']);
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
        this.worklogService.getWorkedHoursWeek(this.todayDate.getFullYear(), this.monthNames.indexOf(this.selectedDevice)).subscribe( x => {

          this.weekHoursMonth = x as WeekHours[];
          console.log(x);
          this.allDataReceived = true;
          });
      }
      }
    });
  }
}
