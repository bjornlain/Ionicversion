import { Component } from '@angular/core';
import {WorklogService} from '../services/worklog.service';
import {Hour} from '../models/hour';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {Token} from '../models/token';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/operators';
import {Worklog} from '../models/worklog';
import * as moment from 'moment';

@Component({
  selector: 'clock',
  templateUrl: 'clock.page.html',
  styleUrls: ['clock.page.scss']
})
export class ClockPage {
  myDate: number;
  clockedIn = false;
  pauseIn = false;
  allWeekDataReceived: boolean = false;
  allMonthDataReceived: boolean = false;
  today: Date;
  monthArray: Worklog[] = [];
  weekHours: Hour;
  monthHours: Hour;
  weekHoursLeft: Hour;
  monthHoursLeft: Hour;
  todayHours: Hour;
  clockInTime: Hour = new Hour(0, 0, 0);
  workLog: Worklog;
  todayDate: Date;
  worklogsMonth: Worklog[];
  worklogsWeek: Worklog[];
  timeWorking: Hour = new Hour( 0, 0, 0);
  timeBreaking: Hour = new Hour( 0, 0, 0);
  timeTodayLeft: Hour = new Hour( 8 , 0 , 0);
  interval = null;
  intervalBreak = null;
  overall;
  token: Token;
  constructor(private worklogService: WorklogService, private router: Router, private authService: AuthService) {
    this.myDate = new Date().getTime();
    this.todayDate = new Date();
    this.getWeekAndMonthHours();
  }
  getWeekAndMonthHours() {
    const firstDayOfMonth = moment().startOf('month').toDate();
    const lastDayOfMonth = moment().endOf('month').toDate();
    this.authService.token.subscribe(x => { if (x) {
    this.worklogService.getWorkedHours(this.todayDate.getFullYear(), this.todayDate.getMonth(),
        firstDayOfMonth.getDate(), lastDayOfMonth.getDate()).subscribe( x => {
      this.worklogsMonth = x as Worklog[];
      console.log(this.worklogsMonth);
      let monthMinutes = 0;
      for (const day of this.worklogsMonth) {
        monthMinutes += day.worked;
      }
      this.monthHours = this.worklogService.convertMinutesToHours(monthMinutes);
      if (this.monthHours.minutes === 60 ) { this.monthHours.minutes = 0; }
      if (this.monthHours.minutes > 0 ) {
        this.monthHoursLeft = new Hour(160 - this.monthHours.hours - 1, 60 - this.monthHours.minutes, 0);
      } else {
        this.monthHoursLeft = new Hour(160 - this.monthHours.hours, 60 - this.monthHours.minutes, 0);
      }
      this.allMonthDataReceived = true;
    });
 }
                                            const firstDayOfWeek = moment().startOf('week').toDate();
                                            const lastDayOfWeek = moment().endOf('week').toDate();
                                            this.worklogService.getWorkedHours(this.todayDate.getFullYear(), this.todayDate.getMonth(),
          firstDayOfWeek.getDate(), lastDayOfWeek.getDate()).subscribe( x => {
        this.worklogsWeek = x as Worklog[];
        console.log(this.worklogsWeek);
        let weekMinutes = 0;
        for (const day of this.worklogsWeek) {
          weekMinutes += day.worked;
        }
        this.weekHours = this.worklogService.convertMinutesToHours(weekMinutes);
        if (this.weekHours.minutes === 60 ) { this.weekHours.minutes = 0; }
        if (this.weekHours.minutes > 0) {
          this.weekHoursLeft = new Hour( 40 - this.weekHours.hours - 1, 60 - this.weekHours.minutes, 0);
        } else {
          this.weekHoursLeft = new Hour( 40 - this.weekHours.hours, 60 - this.weekHours.minutes, 0);
        }
        this.allWeekDataReceived = true;
      });
  });
  }
  clockIn() {
    this.clockedIn = !this.clockedIn;
    this.clockInTime = new Hour(new Date().getHours(), new Date().getMinutes(), 0);
    this.interval = setInterval(() => {
      this.timeWorking.seconds ++;
      if (this.timeWorking.seconds === 60) {
        this.timeWorking.minutes ++;
        this.timeWorking.seconds = 0;
      }
      if (this.timeWorking.minutes === 60) {
        this.timeWorking.minutes = 0;
        this.timeWorking.hours ++;
      }
      if (this.timeWorking.seconds > 0 || this.timeWorking.minutes > 0) {
        this.timeTodayLeft = new Hour(8 - this.timeWorking.hours - 1, 60 - this.timeWorking.minutes - 1, 60 - this.timeWorking.seconds);
      } else {
        this.timeTodayLeft = new Hour(8 - this.timeWorking.hours, 60 - this.timeWorking.minutes - 1, 60 - this.timeWorking.seconds);
      }
    }, 1000);
  }
    goToCreateWorklogDate(){
        this.router.navigate(['/tabs/createWorklogDate', 'clock']);
    }
  clockOut() {
    this.pauseTimer();
    if (!this.clockedIn) {
      this.clockedIn = true;
    } else {
      this.clockedIn = false;
    }
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  pauseTimerBreak() {
    clearInterval(this.intervalBreak);
  }
  takeBreak() {
    this.pauseTimer();
    this.pauseIn = true;
    this.intervalBreak = setInterval(() => {
      this.timeBreaking.seconds ++;
      if (this.timeBreaking.seconds === 60) {
        this.timeBreaking.minutes ++;
        this.timeBreaking.seconds = 0;
      }
      if (this.timeBreaking.minutes === 60) {
        this.timeBreaking.minutes = 0;
        this.timeBreaking.hours ++;
      }
    }, 1000);
  }
  stopBreak() {
    this.pauseTimerBreak();
    this.clockedIn = false;
    this.pauseIn = false;
    this.clockIn();
  }
}
