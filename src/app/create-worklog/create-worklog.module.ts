import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ClockPage} from './clock.page';
import {Add0Pipe} from '../services/add0.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ClockPage}])
  ],
  declarations: [ClockPage, Add0Pipe]
})
export class ClockModule {}
