import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WeekHours} from '../models/weekHours';
import {WorklogService} from '../services/worklog.service';
import {WeekDate} from '../models/WeekDate';
import {Worklog} from '../models/worklog';
import * as moment from '../timesheets/timesheets.component';
import {Hour} from '../models/hour';
import {AuthService} from '../services/auth.service';
import {IonTabs} from "@ionic/angular";


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  weekHours: WeekHours ;
  monthSelected: Date ;
  monthString: string;
  allDataReceived = false;
  counter = 0;
  isChoosing: boolean = false;
  hours: Hour;
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  weekNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  workLogsDay: Worklog[] = [];
  weekDates: WeekDate[] = [];
  constructor( private router: Router, private worklogService: WorklogService, private authService: AuthService) { }

  ngOnInit() {
    this.weekDates = [];
    this.weekHours = this.worklogService.getWeekHours();
    this.monthSelected = this.worklogService.getMonthSelected();
    console.log(this.weekHours);
    this.monthString = this.monthNames[this.monthSelected.getMonth()];
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.weekDates = [];
        this.counter = 0;
        this.weekHours = this.worklogService.getWeekHours();
        this.worklogService.setWeekSelected(this.weekHours.weekNumber);
        this.monthSelected = this.worklogService.getMonthSelected();
        this.monthString = this.monthNames[this.monthSelected.getMonth()];
        console.log(this.weekHours);
        console.log(this.monthSelected);
        this.convertToWeekDateArray();
      }
    });
  }
  goBack() {
    this.router.navigate(['/tabs/timesheets']);
  }
  goToDay(day: Date) {
    this.worklogService.setDaySelected(day);
    this.router.navigate(['/tabs/day']);
  }
  chooseCreate(){
    if (this.isChoosing === false) {
      this.isChoosing = true;
    } else {
      this.isChoosing = false;
    }
  }
  goToCreateWorklog(){
    this.worklogService.setDaySelected(this.weekDates[0].date);
    console.log(this.weekDates[0].date);
    this.isChoosing = false;
    this.router.navigate(['/tabs/createWorklogDate', 'week']);
  }
  goToCreateTask(){
    this.isChoosing = false;
    this.router.navigate(['/tabs/createTask', 'week']);
  }
  convertToWeekDateArray() {
      this.authService.token.subscribe(x => { if (x) {
        if (x.access_token != null) {
          this.worklogService.getWorkedHoursWeekDays(this.monthSelected.getFullYear(), this.monthSelected.getMonth(),
              this.weekHours.startDay, this.weekHours.endDay).subscribe( x => {
            this.weekDates = x as WeekDate[];
            console.log(this.weekDates);
            this.allDataReceived = true;
          });
          }
 }
      });
    }
}


