import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  logOut() {
    this.router.navigate(['/login']);
  }
  goToInformation(){
    this.router.navigate(['/tabs/information']);
  }
  goToNotifications(){
    this.router.navigate(['/tabs/notifications']);
  }
  goToExport(){
    this.router.navigate(['/tabs/export']);
  }
}
