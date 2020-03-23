import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonDatetime} from "@ionic/angular";
import {WeekSchedule} from "../models/week-schedule";
import {Hour} from "../models/hour";

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent implements OnInit {
  private sub: any;
  day: string;
  schedule: WeekSchedule;
  form;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.day = this.route.snapshot.paramMap.get('day');
   this.schedule = new WeekSchedule(this.day , new Hour(8 , 0 , 0), new Hour(0 , 30 , 0));
  }
  goBackSchedule() {
    this.router.navigate(['/tabs/schedule']);
  }
  saveSchedule() {
    this.router.navigate(['/tabs/schedule', this.schedule.day , this.schedule.codingHours.hours , this.schedule.codingHours.minutes
    , this.schedule.socialHours.hours , this.schedule.socialHours.minutes]);
  }
  updateCodingHours($event) {
    this.schedule.codingHours = new Hour((+$event.substr(11, 2)), (+$event.substr(14, 2)), 0);
    console.log(this.schedule);
  }
  updateSocialHours($event) {
    this.schedule.socialHours = new Hour((+$event.substr(11, 2)), (+$event.substr(14, 2)), 0);
    console.log(this.schedule);
  }
}
