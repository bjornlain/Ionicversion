import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ScheduleComponent} from './schedule.component';
import {Add02Pipe} from "../services/add02.pipe";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ScheduleComponent}])
  ],
  declarations: [ScheduleComponent, Add02Pipe]
})
export class ScheduleModule {}
