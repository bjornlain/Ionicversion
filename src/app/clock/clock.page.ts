import { Component } from '@angular/core';
import {WorklogService} from '../services/worklog.service';
import {Worklog} from '../models/worklog';
import {Hours} from '../models/hours';
import {timer} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'clock',
  templateUrl: 'clock.page.html',
  styleUrls: ['clock.page.scss']
})
export class ClockPage {
  myDate: number;
  clockedIn: boolean = false;
  pauseIn: boolean = false;
  today: Date;
  weekHours: Hours;
  monthHours: Hours;
  weekHoursLeft: Hours;
  monthHoursLeft: Hours;
  todayHours: Hours;
  workLog: Worklog;
  timeWorking: Hours = new Hours( 0, 0, 0);
  timeBreaking: Hours = new Hours( 0, 0, 0);
  timeTodayLeft: Hours = new Hours( 8 , 0 , 0);
  interval = null;
  intervalBreak = null;
  overall;
  constructor(private worklogService: WorklogService, private router: Router) {
    this.myDate = new Date().getTime();
    let todayDate = new Date();
    this.weekHours = this.worklogService.calculateWeekHours();
    this.monthHours = this.worklogService.calculateMonthHours(todayDate.getFullYear(), todayDate.getMonth());
    if (this.weekHours.minutes > 0) {
      this.weekHoursLeft = new Hours( 40 - this.weekHours.hours - 1, 60 - this.weekHours.minutes, 0);
    } else {
      this.weekHoursLeft = new Hours( 40 - this.weekHours.hours, 60 - this.weekHours.minutes, 0);
    }
    if(this.monthHours.minutes > 0 ) {
      this.monthHoursLeft = new Hours(160 - this.monthHours.hours - 1, 60 - this.monthHours.minutes, 0);
    } else {
      this.monthHoursLeft = new Hours(160 - this.monthHours.hours, 60 - this.monthHours.minutes, 0);
    }
  }
  clockIn() {
    if (!this.clockedIn) {
      this.clockedIn = true;
    } else {
      this.clockedIn = false;
    }
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
        this.timeTodayLeft = new Hours(8 - this.timeWorking.hours - 1, 60 - this.timeWorking.minutes - 1, 60 - this.timeWorking.seconds);
      } else {
        this.timeTodayLeft = new Hours(8 - this.timeWorking.hours, 60 - this.timeWorking.minutes - 1, 60 - this.timeWorking.seconds);
      }
    }, 1000);
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
