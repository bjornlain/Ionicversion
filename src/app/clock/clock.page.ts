import { Component } from '@angular/core';
import {WorklogService} from '../services/worklog.service';
import {Worklog} from '../models/worklog';
import {Hours} from '../models/hours';
import {timer} from 'rxjs';
import {Router} from '@angular/router';
import {Worklog2Service} from "../services/worklog2.service";
import {Token} from "../models/token";
import {AuthService} from "../services/auth.service";
import {take} from "rxjs/operators";
import {Worklog2} from "../models/worklog2";


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
  monthArray: Worklog2[] = [];
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
  token: Token;
  constructor(private worklogService: WorklogService, private router: Router, private authService: AuthService, private worklogService2: Worklog2Service) {
    this.myDate = new Date().getTime();
    let todayDate = new Date();
    let firstDayOfMonth = this.worklogService.getFirstDayOfMonth(todayDate.getMonth()).getDate();
    let lastDayOfMonth = this.worklogService.getLastDayOfMonth(todayDate.getMonth()).getDate();

    this.authService.token.subscribe(x => { if(x)
      this.worklogService2.getWorkedHours(todayDate.getFullYear(), todayDate.getMonth(), firstDayOfMonth , lastDayOfMonth);
    });
    this.weekHours = this.worklogService.calculateWeekHours();

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
    this.clockedIn = !this.clockedIn;

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
