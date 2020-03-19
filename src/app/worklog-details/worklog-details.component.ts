import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {Hours} from '../models/hours';
import {AuthService} from '../services/auth.service';
import {DayDate} from '../models/dayDate';

@Component({
  selector: 'app-worklog-details',
  templateUrl: './worklog-details.component.html',
  styleUrls: ['./worklog-details.component.scss'],
})
export class WorklogDetailsComponent implements OnInit {
  weekSelected: number;
  daySelected: Date;
  taskTitle: string;
  taskDescription: string;
  worklogSelected: DayDate;
  todayHours: Hours;
  startHours: Hours;
  timeSpendHours: Hours;
  endHours: Hours;
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  weekNames: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  dayHours: Hours = new Hours(0, 0, 0);
  dayString: string;

  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) {
  }

  ngOnInit() {
    this.weekSelected = this.worklogService.getWeekSelected();
    this.daySelected = this.worklogService.getDaySelected();
    this.worklogSelected = this.worklogService.getWorklogSelected();
    this.taskTitle = this.worklogSelected.task.key;
    const startDate = new Date(this.worklogSelected.startDate);
    const endDate = new Date(this.worklogSelected.endDate);
    this.startHours = new Hours(startDate.getHours(), startDate.getMinutes(), 0);
    this.endHours = new Hours(endDate.getHours(), endDate.getMinutes(), 0);
    this.dayHours = this.worklogService.getWorklogSelected().hours;
    const timeSpend = (this.endHours.hours * 60 + this.endHours.minutes) - (this.startHours.hours * 60 + this.startHours.minutes);
    this.timeSpendHours = new Hours(Math.floor(timeSpend / 60), (timeSpend % 60), 0);
    this.todayHours = new Hours(new Date().getHours(), new Date().getMinutes(), 0);
    console.log(this.worklogSelected);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const startDate = new Date(this.worklogSelected.startDate);
        const endDate = new Date(this.worklogSelected.endDate);
        this.dayHours = this.worklogService.getWorklogSelected().hours;
        this.startHours = new Hours(startDate.getHours(), startDate.getMinutes(), 0);
        this.endHours = new Hours(endDate.getHours(), endDate.getMinutes(), 0);
        this.todayHours = new Hours(new Date().getHours(), new Date().getMinutes(), 0);
        this.weekSelected = this.worklogService.getWeekSelected();
        this.worklogSelected = this.worklogService.getWorklogSelected();
        this.taskTitle = this.worklogSelected.task.key;
        this.taskDescription = this.worklogSelected.description;
        this.daySelected = this.worklogService.getDaySelected();
        const timeSpend = (this.endHours.hours * 60 + this.endHours.minutes) - (this.startHours.hours * 60 + this.startHours.minutes);
        this.timeSpendHours = new Hours(Math.floor(timeSpend / 60), (timeSpend % 60), 0);
        console.log(this.worklogSelected);
        this.getWorklogDetails();
      }
    });
  }

  getWorklogDetails() {
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {
          this.worklogService.getWorkedHoursDay(this.daySelected.getFullYear(), this.daySelected.getMonth(), this.daySelected.getDate())
              .subscribe(x => {
                this.dayString = this.weekNames[this.daySelected.getDay()] + ', ' + this.daySelected.getDate()
                    + ' ' + this.monthNames[this.daySelected.getMonth()];
              });
        }
      }
    });
  }
  goBack() {
    this.router.navigate(['/tabs/day']);
  }
  goToUpdate(){
    this.router.navigate(['/tabs/update-worklog']);
  }
  deleteWorklog(){
    const worklog = this.worklogService.getWorklogSelected();
    console.log(worklog);
    this.worklogService.deleteWorklog(worklog._id);
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {
          this.worklogService.deleteWorklog(worklog._id)
              .subscribe(x => {
                console.log("deleted" + worklog._id);
              });
        }
      }
    });
    this.router.navigate(['/tabs/day']);
  }
}
