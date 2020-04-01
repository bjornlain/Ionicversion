import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  previousPage: string;
  dayArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  description = '';
  yearArray: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    //this.previousPage = this.route.snapshot.paramMap.get('page');

  }
  goBackToPreviousPage(){
    console.log(this.previousPage);
    this.router.navigate(['/tabs/' + this.previousPage]);
  }
}
