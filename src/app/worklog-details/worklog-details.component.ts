import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {WorklogService} from "../services/worklog.service";
import {Hours} from "../models/hours";
import {AuthService} from "../services/auth.service";
import {DayDate} from "../models/dayDate";

@Component({
  selector: 'app-worklog-details',
  templateUrl: './worklog-details.component.html',
  styleUrls: ['./worklog-details.component.scss'],
})
export class WorklogDetailsComponent implements OnInit {
  weekSelected: number;
  daySelected: Date;
  taskTitle: string;
  worklogSelected: DayDate;
  monthNames: string[] = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  weekNames: string[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  dayHours: Hours = new Hours(0, 0, 0);
  dayString: string;

  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) {
  }

  ngOnInit() {
    this.weekSelected = this.worklogService.getWeekSelected();
    this.daySelected = this.worklogService.getDaySelected();
    this.worklogSelected = this.worklogService.getWorklogSelected();
    this.taskTitle = "kik";
    console.log(this.worklogSelected);
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.weekSelected = this.worklogService.getWeekSelected();
        this.worklogSelected = this.worklogService.getWorklogSelected();
        this.daySelected = this.worklogService.getDaySelected();
        console.log(this.worklogSelected);
        this.getWorklogDetails();
      }
    });
  }

  getWorklogDetails() {
    this.authService.token.subscribe(x => {
      if (x)
        if (x.access_token != null) {
          this.worklogService.getWorkedHoursDay(this.daySelected.getFullYear(), this.daySelected.getMonth(), this.daySelected.getDate())
              .subscribe(x => {
                this.dayString = this.weekNames[this.daySelected.getDay()] + ", " + this.daySelected.getDate()
                    + " " + this.monthNames[this.daySelected.getMonth()];
              });
        }
    });
  }
  goBack(){
    this.router.navigate(['/tabs/day']);
  }
}
