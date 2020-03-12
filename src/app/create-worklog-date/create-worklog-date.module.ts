import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CreateWorklogDateComponent} from "./create-worklog-date.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: CreateWorklogDateComponent}])
  ],
  declarations: [CreateWorklogDateComponent]
})
export class CreateWorklogDateModule {}
