import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Hours} from "../models/hours";
import {WorklogService} from "../services/worklog.service";
import {WeekHours} from "../models/weekHours";

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.scss'],
})
export class TimesheetsComponent implements OnInit {
  monthNames: string[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  yearToday: number;
  monthToday: string;
  monthHours: Hours;
  daysWorked: number;
  minutesPerDay: number;
  averageHoursDay: Hours;
  selectedDevice ;
  weekHoursMonth: WeekHours[] = [];
  constructor(private router: Router, private worklogService: WorklogService) { }

  ngOnInit() {
    const today = new Date();
    this.yearToday = today.getUTCFullYear();
    this.selectedDevice = this.monthNames[today.getMonth()];
    this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.selectedDevice , this.yearToday);
    this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
    this.daysWorked = this.worklogService.getDaysWorked();
    this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
    this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0);
  }
  goToWeek(){
    this.router.navigate(['/tabs/week']);
  }
  onChange(newValue) {
    this.selectedDevice = newValue;
    this.monthToday = newValue;
    this.weekHoursMonth = this.worklogService.calculateWeekHoursperMonth(this.monthToday , this.yearToday);
    this.monthHours = this.worklogService.calculateMonthHours(this.yearToday, this.monthNames.indexOf(this.selectedDevice));
    this.daysWorked = this.worklogService.getDaysWorked();
    this.minutesPerDay = (this.monthHours.hours * 60 + this.monthHours.minutes) / this.daysWorked;
    this.averageHoursDay = new Hours(Math.floor(this.minutesPerDay / 60) , Math.round(this.minutesPerDay % 60) , 0);
  }
}
