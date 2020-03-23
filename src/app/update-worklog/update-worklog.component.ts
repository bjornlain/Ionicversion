import { Component, OnInit } from '@angular/core';
import {Hour} from '../models/hour';
import {DayDate} from '../models/dayDate';
import {WorklogService} from '../services/worklog.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Task} from '../models/task';

@Component({
  selector: 'app-update-worklog',
  templateUrl: './update-worklog.component.html',
  styleUrls: ['./update-worklog.component.scss'],
})
export class UpdateWorklogComponent implements OnInit {
  dayArray: number[] = [];
  monthArray: string[] = [];
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  weekNames: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  weekNames2: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  description = '';
  weekSelected: number;
  startMinutes: number;
  endMinutes: number;
  thisDay: Date;
  daySelected: any;
  yearSelected: any;
  monthSelected: any;
  taskTitle: string;
  startHours: any;
  endHours: any;
  worked: number;
  worklogSelected: DayDate;
  yearArray: number[] = [];
  dayHours: Hour = new Hour(0, 0, 0);
  dayString: string;
  dayString2: string;
  task: any;
  project: any;

  constructor(private worklogService: WorklogService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.dayArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    this.monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.yearArray = [2015, 2016, 2017, 2018, 2019, 2020];
    this.weekSelected = this.worklogService.getWeekSelected();
    this.worklogSelected = this.worklogService.getWorklogSelected();
    this.taskTitle = this.worklogSelected.task.key;
    this.dayHours = this.worklogService.getWorklogSelected().hours;
    console.log(this.dayHours);
    this.description = this.worklogSelected.description;
    this.task = this.worklogSelected.task._id;
    console.log('day selected' + this.worklogService.getDaySelected().getDate());
    console.log('month selected ' + this.worklogService.getMonthSelected().getMonth());
    this.daySelected = this.worklogService.getDaySelected().getDate().toString();
    this.monthSelected = this.monthArray[this.worklogService.getMonthSelected().getMonth()];
    this.yearSelected = '2020';
    this.project = 'Project';
    this.startMinutes = this.worklogSelected.startDate.getHours() * 60 + this.worklogSelected.startDate.getMinutes();
    this.endMinutes = this.worklogSelected.endDate.getHours() * 60 + this.worklogSelected.endDate.getMinutes();
    this.thisDay = this.worklogService.getDaySelected();
    this.dayString = this.weekNames[this.thisDay.getDay()] + ', ' + this.thisDay.getDate()
        + ' ' + this.monthNames[this.thisDay.getMonth()];
    this.dayString2 = this.weekNames2[this.thisDay.getDay()] + ', ' + this.thisDay.getDate()
        + ' ' + this.monthNames[this.thisDay.getMonth()].toLowerCase();
    this.converToThisStartAndEndHours();
  }
  converToThisStartAndEndHours() {
    let startDateHours = '';
    let endDateHours = '';
    if (this.worklogSelected.startDate.getHours() < 10) {
      startDateHours += '0' + this.worklogSelected.startDate.getHours() + ':';
    } else {
      startDateHours += this.worklogSelected.startDate.getHours() + ':';
    }
    if (this.worklogSelected.startDate.getMinutes() < 10) {
      startDateHours += '0' + this.worklogSelected.startDate.getMinutes();
    } else {
      startDateHours += this.worklogSelected.startDate.getMinutes();
    }
    this.startHours = startDateHours;
    if (this.worklogSelected.endDate.getHours() < 10) {
      endDateHours += '0' + this.worklogSelected.endDate.getHours() + ':';
    } else {
      endDateHours += this.worklogSelected.endDate.getHours() + ':';
    }
    if (this.worklogSelected.endDate.getMinutes() < 10) {
      endDateHours += '0' + this.worklogSelected.endDate.getMinutes();
    } else {
      endDateHours += this.worklogSelected.endDate.getMinutes();
    }
    this.endHours = endDateHours;
  }
  goBackToDay() {
    this.router.navigate(['/tabs/day']);
  }
  updateStartingHours($event) {
    console.log($event);
    this.startMinutes = (+$event.substr(0, 2) * 60) + +$event.substr(3, 2);

  }
  updateEndingHours($event) {
    console.log($event);
    this.endMinutes = (+$event.substr(0, 2) * 60) + +$event.substr(3, 2);
  }
  saveTask() {
    this.router.navigate(['/tabs/day']);
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {

          console.log(this.startMinutes + ' ' + this.endMinutes);
          console.log(this.endMinutes > this.startMinutes);
          if (this.endMinutes > this.startMinutes) {
            this.worked = this.endMinutes - this.startMinutes;
          } else {
            this.startMinutes = this.endMinutes;
            this.worked = 0;
          }
          console.log(this.daySelected + ' ' + this.monthSelected + ' ' + this.yearSelected);
          const startDate = new Date(this.yearSelected , this.monthArray.indexOf(this.monthSelected), this.daySelected);
          const endDate = new Date(this.yearSelected , this.monthArray.indexOf(this.monthSelected), this.daySelected);
          startDate.setHours(Math.floor(this.startMinutes / 60));
          startDate.setMinutes(this.startMinutes % 60);
          console.log(startDate);
          endDate.setHours(Math.floor(this.endMinutes / 60));
          endDate.setMinutes(this.endMinutes % 60);
          console.log(endDate);
          console.log(this.task);
          console.log(this.description);
          console.log(this.worklogSelected._id);
          this.worklogService.updateWorklog(this.worklogSelected._id, false, startDate, endDate, this.description,
              this.task, '593707516865cd044e87ef00' , this.worked).subscribe(x => {
          });
        }
      }
    });
  }
}
