import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {WorklogService} from "../services/worklog.service";
import {AuthService} from "../services/auth.service";
import {Hours} from "../models/hours";

@Component({
  selector: 'app-create-worklog',
  templateUrl: './create-worklog.component.html',
  styleUrls: ['./create-worklog.component.scss'],
})
export class CreateWorklogComponent implements OnInit {
  startMinutes: number = 540;
  startDate: Date;
  endDate: Date;
  endMinutes: number = 720;
  worked: number;
  description: string = "";
  task: string = "";
  constructor(private router: Router, private worklogService: WorklogService,private authService: AuthService) {
  }

  ngOnInit() {
    this.startDate = this.worklogService.getDaySelected();
    this.startDate.setHours(9);
    this.startDate.setMinutes(0);
    this.startDate.setSeconds(0);
    this.endDate = this.worklogService.getDaySelected();
    this.endDate.setHours(12);
    this.endDate.setMinutes(0);
    this.endDate.setSeconds(0);
  }

  goBackToDay() {
    this.router.navigate(['/tabs/day']);
  }
  updateStartingHours($event) {
    console.log($event);
    this.startMinutes = (+$event.substr(11, 2) * 60) + +$event.substr(14, 2);
    this.startDate.setHours(+$event.substr(11, 2));
    this.startDate.setMinutes(+$event.substr(14, 2));
    console.log(this.startDate);
  }
  updateEndingHours($event) {
    console.log($event);
    this.endMinutes = (+$event.substr(11, 2) * 60) + +$event.substr(14, 2);
    this.endDate.setHours(+$event.substr(11, 2));
    this.endDate.setMinutes(+$event.substr(14, 2));
    console.log(this.endDate);
  }
  saveTask() {
    this.router.navigate(['/tabs/day']);
    console.log(this.startDate);
    console.log(this.endDate);
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {
          if(this.endMinutes > this.startMinutes){
            this.worked = this.endMinutes - this.startMinutes;
          }else{
            this.worked = 0;
          }
          if(this.task === ""){
            this.task = "793707516865cd044e87ef01";
          }
          this.worklogService.createNewWorklog("project", this.task,
              this.description,"593707516865cd044e87ef00", this.worked, this.startDate, this.endDate).subscribe(x => {
          });
        }
      }
    });
  }
}
