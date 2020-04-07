import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent implements OnInit {
  week: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  isChoosingStart: boolean = false;
  startOfWeek: string = 'Monday';
  constructor(private router: Router) { }

  ngOnInit() {}

  setStartOfWeek(){
    if (this.isChoosingStart === false) {
      this.isChoosingStart = true;
    } else {
      this.isChoosingStart = false;
    }
  }
  selectStartOfWeek(day: string){
    this.startOfWeek = day.toLowerCase();
    console.log(day);
    if (this.isChoosingStart === false) {
      this.isChoosingStart = true;
    } else {
      this.isChoosingStart = false;
    }
  }
  goBackToSettings(){
    console.log("lol");
    this.router.navigate(['/tabs/settings']);
  }
}
