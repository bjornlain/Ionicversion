import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {AuthService} from '../services/auth.service';
import {Hour} from '../models/hour';

@Component({
  selector: 'app-create-worklog',
  templateUrl: './create-worklog.component.html',
  styleUrls: ['./create-worklog.component.scss'],
})
export class CreateWorklogComponent implements OnInit {
  startMinutes = 540;
  startDate: Date = new Date();
  endDate: Date = new Date();
  endMinutes = 1020;
  worked: number;
  description = '';
  task = '';
  previousPage: string;
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.startDate = new Date(this.worklogService.getDaySelected());
    this.startDate.setHours(9);
    this.startDate.setMinutes(0);
    this.startDate.setSeconds(0);
    this.endDate = new Date(this.worklogService.getDaySelected());
    this.endDate.setHours(12);
    this.endDate.setMinutes(0);
    this.endDate.setSeconds(0);
    this.previousPage = this.route.snapshot.paramMap.get('page');
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.description = "";
      }
    });
  }

  goBackToPreviousPage() {
    this.router.navigate(['/tabs/' + this.previousPage]);
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
    this.router.navigate(['/tabs/' + this.previousPage]);
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
          const startDate = new Date(this.worklogService.getDaySelected());
          startDate.setHours(Math.floor(this.startMinutes / 60) + 1);
          startDate.setMinutes(this.startMinutes % 60);
          console.log(startDate);
          const endDate = new Date(this.worklogService.getDaySelected());
          endDate.setHours(Math.floor(this.endMinutes / 60) + 1);
          endDate.setMinutes(this.endMinutes % 60);
          console.log(endDate);

          if (this.task === '') {
            this.task = '5cc5a0218e552b09f484d888';
          }
          this.worklogService.createNewWorklog('project', this.task,
              this.description, '593707516865cd044e87ef00', this.worked, startDate, endDate).subscribe(x => {
          });
        }
      }
    });
  }
}
