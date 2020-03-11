import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WeekHours} from "../models/weekHours";
import {WorklogService} from "../services/worklog.service";
import {WeekDate} from "../models/WeekDate";
import {Worklog} from "../models/worklog";
import * as moment from "../timesheets/timesheets.component";
import {Hours} from "../models/hours";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  weekHours: WeekHours ;
  monthSelected: Date ;
  monthString: string;
  allDataReceived : boolean = false;
  counter: number = 0;
  hours: Hours;
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  weekNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  workLogsDay: Worklog[] = [];
  weekDates: WeekDate[] = [];
  constructor( private router: Router, private worklogService: WorklogService, private authService : AuthService) { }

  ngOnInit() {
    this.weekDates = [];
    this.weekHours = this.worklogService.getWeekHours();
    this.monthSelected = this.worklogService.getMonthSelected();
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

  convertToWeekDateArray(){
    for(let i = this.weekHours.startDay; i <= this.weekHours.endDay; i++){
      this.authService.token.subscribe(x => { if(x)
        if(x.access_token != null){
          this.worklogService.getWorkedHoursDay(this.monthSelected.getFullYear(), this.monthSelected.getMonth(),
              i).subscribe( x => {
            this.counter++;
            this.workLogsDay = x as Worklog[];
            if(this.workLogsDay.length > 0){
              console.log(this.workLogsDay);
              let dayMinutes = 0;
              for(let day of this.workLogsDay){
                dayMinutes += day.worked;
              }
              console.log(dayMinutes);
              const hours = Math.floor(dayMinutes/ 60);
              const minutes = dayMinutes % 60;
              console.log(this.counter-1);
              this.weekDates[this.counter - 1] = new WeekDate(null, null,null);
              this.hours = new Hours(hours, minutes, 0);
              this.weekDates[this.counter - 1].hours = this.hours;
              let date = new Date(this.workLogsDay[0].startDate);
              console.log(date);
              console.log(this.weekDates[this.counter-1].hours);
              console.log(i);
              let date2 = new Date(this.monthSelected.getFullYear(), this.monthSelected.getMonth(), i);
              this.weekDates[this.counter-1].date = date2;
              this.weekDates[this.counter-1].weekDate = this.weekNames[date.getDay()] + ". " + date.getDate()
                  + " " + this.monthNames[date.getMonth()];
            }else{
              let date2 = new Date(this.monthSelected.getFullYear(), this.monthSelected.getMonth(), i);
              this.weekDates[this.counter-1] = new WeekDate(new Hours(0,0,0), this.weekNames[date2.getDay()]
                  + ". " +  i + " " + this.monthNames[this.monthSelected.getMonth()], date2);
            }
            if(this.counter === (this.weekHours.endDay - this.weekHours.startDay + 1)){
              console.log(this.weekDates);
              this.weekDates.sort((a, b) => (a.date.getDate() > b.date.getDate()) ? 1 : -1);
              this.allDataReceived = true;
            }
          });
          }
      });
    }
}
}

