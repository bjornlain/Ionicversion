import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DayComponent} from "./day.component";
import {Add04Pipe} from "../services/add04.pipe";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: DayComponent}])
  ],
  declarations: [DayComponent, Add04Pipe]
})
export class DayModule {}
