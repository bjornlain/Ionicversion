import { Component, OnInit } from '@angular/core';
import {Worklog} from "../models/worklog";
import {Router} from "@angular/router";
import {Hours} from "../models/hours";
import {WorklogHours} from "../models/worklogHours";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {
  taskArray: Worklog[] = [{
    id: '001',
    name: 'Set ut perspiciatis.',
    worked: 40,
    description: 'Set ut perspiciatis.',
    date : new Date(2020, 2,  3, 0, 0, 0)
  },
    {
      id: '002',
      name: 'Set ut perspiciatis.',
      worked: 60,
      description: 'Set ut perspiciatis.',
      date : new Date(2020, 2,  3, 0, 0, 0)
    },
    {
      id: '003',
      name: 'Set ut perspiciatis.',
      worked: 120,
      description: 'Coffee-break.',
      date : new Date(2020, 2,  3, 0, 0, 0)
    },
    {
      id: '004',
      name: 'Meeting intern',
      worked: 140,
      description: 'Meeting.',
      date : new Date(2020, 2,  3, 0, 0, 0)
    }
  ];
  worklogHoursArray: WorklogHours[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
    for (const task of this.taskArray) {
      this.worklogHoursArray.push(new WorklogHours(task, new Hours(Math.floor(task.worked / 60), task.worked % 60 , 0)));
    }
  }
  goBack(){
    this.router.navigate(['/tabs/week']);
  }
}
