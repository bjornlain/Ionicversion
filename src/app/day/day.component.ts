import { Component, OnInit } from '@angular/core';
import {Worklog} from "../models/worklog";
import {NavigationEnd, Router} from "@angular/router";
import {Hours} from "../models/hours";
import {WorklogHours} from "../models/worklogHours";
import {WorklogService} from "../services/worklog.service";
import {WeekDate} from "../models/WeekDate";
import {AuthService} from "../services/auth.service";
import {DayDate} from "../models/dayDate";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  daySelected: Date;
  dayString : string;
  dayWorklogs: DayDate[] = [];
  counter: number;
  weekSelected: number;
  allDataReceived: boolean = false;
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  weekNames: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  worklogsDay: Worklog[] = [];
  dayHours = new Hours(0, 0, 0);
  worklogHoursArray: WorklogHours[] = [];
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.counter = 0;
        this.dayWorklogs= [];
        this.weekSelected = this.worklogService.getWeekSelected();
        this.daySelected = this.worklogService.getDaySelected();
        console.log(this.daySelected);
        this.getWorklogsDay();
      }
    });
  }
  goBack(){
    this.router.navigate(['/tabs/week']);
  }
  goToDetails(worklog: DayDate){
    console.log(worklog);
    this.worklogService.setWorklogSelected(worklog);
    this.router.navigate(['/tabs/worklog-details']);
  }
  goToUpdate(worklog: DayDate){
    this.worklogService.setWorklogSelected(worklog);
    this.router.navigate(['/tabs/update-worklog']);
  }
  getWorklogsDay(){
    this.authService.token.subscribe(x => { if(x)
      if(x.access_token != null){
        this.worklogService.getWorkedHoursDay(this.daySelected.getFullYear(), this.daySelected.getMonth(), this.daySelected.getDate())
            .subscribe( x => {
              this.worklogsDay = x as Worklog[];
              if(this.worklogsDay.length > 0){
                console.log(this.worklogsDay);
                let dayMinutes = 0;
                let yearSelected = this.worklogService.getMonthSelected().getFullYear();
                let monthSelected = this.worklogService.getMonthSelected().getMonth();
                for (let day of this.worklogsDay){
                  console.log(day.worked);
                  dayMinutes += day.worked;
                  const hours = Math.floor(day.worked/ 60);
                  const minutes = day.worked % 60;
                  let startDate = new Date(day.startDate);
                  let endDate = new Date(day.endDate);
                  let date = new Date(yearSelected, monthSelected, this.daySelected.getDate());
                  this.dayWorklogs[this.counter] = new DayDate(day._id, new Hours(hours, minutes, 0), this.daySelected.getDate() ,
                      startDate, endDate, day.description , day.task);
                  this.counter++;
                }
                const hours = Math.floor(dayMinutes/ 60);
                const minutes = dayMinutes % 60;
                this.dayHours = new Hours(hours, minutes, 0);
                this.worklogService.setDayHours(this.dayHours);
              } else{
                this.dayHours = new Hours(0, 0, 0);
                this.worklogService.setDayHours(this.dayHours);
              }
              if(this.counter === this.worklogsDay.length && this.worklogsDay.length > 0){
                console.log(this.dayWorklogs);
                this.dayWorklogs.sort((a, b) => (a.startDate.getTime() > b.startDate.getTime()) ? 1 : -1);
                this.allDataReceived = true;
              }
              this.dayString = this.weekNames[this.daySelected.getDay()] + ", " + this.daySelected.getDate()
                  + " " + this.monthNames[this.daySelected.getMonth()];
            });
      }
    });
  }
  createNewWorklog(){
    this.router.navigate(['/tabs/createWorklog']);
  }
}
