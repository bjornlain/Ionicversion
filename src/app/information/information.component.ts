import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  week: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  isChoosingStart: boolean = false;
  startOfWeek: string;
  constructor() { }

  ngOnInit() {}

  setStartOfWeek(){
    if (this.isChoosingStart === false) {
      this.isChoosingStart = true;
    } else {
      this.isChoosingStart = false;
    }
  }
  selectStartOfWeek(day: string){
    this.startOfWeek = day.toLocaleUpperCase();
    console.log(day);
    if (this.isChoosingStart === false) {
      this.isChoosingStart = true;
    } else {
      this.isChoosingStart = false;
    }
  }
}
