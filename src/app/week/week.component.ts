import { Component, OnInit } from '@angular/core';
import {DateService} from '../services/date.service';
import {Date} from '../models/date';
import {Router} from '@angular/router';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
})
export class WeekComponent implements OnInit {
  dateArray: Date[] = [];
  constructor(private dateService: DateService, private router: Router) { }

  ngOnInit() {
    this.dateArray = this.dateService.getAll();
  }
  goBack() {
    this.router.navigate(['/tabs/timesheets']);
  }
  goToDay() {
    this.router.navigate(['/tabs/day']);
  }
}
