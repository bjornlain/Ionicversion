import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {WorklogService} from '../services/worklog.service';
import {AuthService} from '../services/auth.service';
import {TaskService} from "../services/task.service";
import {ProjectService} from "../services/project.service";
import {Project} from "../models/project";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit {
  previousPage: string;
  daySelected: any;
  monthSelected;
  yearSelected;
  project;
  assignee;
  projectList: Project[];
  userList: User[];
  allUserList: User[];
  assigneeList: User[];
  dayArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  description = '';
  yearArray: number[] = [2015, 2016, 2017, 2018, 2019, 2020];
  constructor(private router: Router, private taskService: TaskService, private authService: AuthService,
              private route: ActivatedRoute, private projectService: ProjectService, private userService: UserService) {
  }

  ngOnInit() {
    this.previousPage = this.route.snapshot.paramMap.get('page');
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {
          this.projectService.getProjects().subscribe(x => {
            this.projectList = x as Project[];
            console.log(this.projectList);
          });
          this.userService.getUsers().subscribe(x => {
            this.userList = x as User[];
            this.allUserList = x as User[];
            console.log(this.userList);
          });
        }
      }
    });
  }
  goBackToPreviousPage(){
    console.log(this.previousPage);
    this.router.navigate(['/tabs/' + this.previousPage]);
  }
  updateAssigneeList(value) {
    console.log(value);
    console.log(this.assignee);
  }
  saveTask(){
    this.router.navigate(['/tabs/' + this.previousPage]);
    this.authService.token.subscribe(x => {
      if (x) {
        if (x.access_token != null) {
          console.log(this.project);
          const date = new Date(this.yearSelected , this.monthSelected - 1, this.daySelected);
          this.taskService.createNewTask(false, 'enerdo',
              this.description, date, 'summary', this.project, '593707516865cd044e87ef00').subscribe(x => {
          });
        }
      }
    });
  }
}
