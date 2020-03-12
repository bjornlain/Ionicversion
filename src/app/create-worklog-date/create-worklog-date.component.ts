import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-worklog-date',
  templateUrl: './create-worklog-date.component.html',
  styleUrls: ['./create-worklog-date.component.scss'],
})
export class CreateWorklogDateComponent implements OnInit {

  description: string = "";
  task: string = "";
  constructor() { }

  ngOnInit() {}

}
