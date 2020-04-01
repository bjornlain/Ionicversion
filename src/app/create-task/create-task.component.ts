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
  constructor(private router: Router, private worklogService: WorklogService, private authService: AuthService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.previousPage = this.route.snapshot.paramMap.get('page');

  }
  goBackToPreviousPage(){
    console.log(this.previousPage);
    this.router.navigate(['/tabs/' + this.previousPage]);
  }
}
