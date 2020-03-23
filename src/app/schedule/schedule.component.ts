import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WeekSchedule} from '../models/week-schedule';
import {Hour} from '../models/hour';
import {IonDatetime} from "@ionic/angular";
import {WebElement} from "selenium-webdriver";
import {WeekScheduleService} from "../services/weekSchedule.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  newDaySchedule: WeekSchedule;
  scheduleArray: WeekSchedule[];
  constructor(private router: Router, private dataRoute: ActivatedRoute, private scheduleService: WeekScheduleService) { }

  ngOnInit() {
    this.newDaySchedule = new WeekSchedule(this.dataRoute.snapshot.params['day'], new Hour(this.dataRoute.snapshot.params['codingHours'],
        this.dataRoute.snapshot.params['codingMinutes'], 0), new Hour(this.dataRoute.snapshot.params['socialHours'],
        this.dataRoute.snapshot.params['socialMinutes'], 0));
    console.log(this.newDaySchedule);
    if (this.newDaySchedule.day !== undefined) {
      this.scheduleService.setDay(this.newDaySchedule);
    }
    this.scheduleArray = this.scheduleService.getAll();
  }
  newSchedule(day: string) {
  this.router.navigate(['/tabs/new-schedule', day]);
  }
}
