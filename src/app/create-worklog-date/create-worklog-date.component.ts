import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-create-worklog-date',
  templateUrl: './create-worklog-date.component.html',
  styleUrls: ['./create-worklog-date.component.scss'],
})
export class CreateWorklogDateComponent implements OnInit {
  dayArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  description = '';
  yearArray: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  startMinutes = 540;
  startDate: Date = new Date();
  endDate: Date = new Date();
  endMinutes = 1020;
  daySelected: any;
  monthSelected;
  yearSelected;
  worked: number;
  task = '';
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  goBackToDay() {
    // werkt niet !
   // this.location.;
  }
  updateStartingHours($event) {
    console.log($event);
    this.startMinutes = (+$event.substr(11, 2) * 60) + +$event.substr(14, 2);
  }
  updateEndingHours($event) {
    console.log($event);
    this.endMinutes = (+$event.substr(11, 2) * 60) + +$event.substr(14, 2);
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
          const date = new Date(this.yearSelected, this.monthSelected - 1, this.daySelected);
          console.log(date);
          const startDate = new Date(date);
          startDate.setHours(Math.floor(this.startMinutes / 60));
          startDate.setMinutes(this.startMinutes % 60);
          console.log(startDate);
          const endDate = new Date(date);
          endDate.setHours(Math.floor(this.endMinutes / 60));
          endDate.setMinutes(this.endMinutes % 60);
          console.log(endDate);

          if (this.task === '') {
            this.task = '5cc5a0218e552b09f484d888';
          }
          console.log(this.task);
          this.worklogService.createNewWorklog('project', this.task,
              this.description, '593707516865cd044e87ef00', this.worked, startDate, endDate).subscribe(x => {
          });
        }
      }
    });
  }
}
