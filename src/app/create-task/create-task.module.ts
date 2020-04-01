import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CreateTaskComponent} from "./create-task.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: CreateTaskComponent}])
  ],
  declarations: [CreateTaskComponent]
})
export class CreateTaskModule {}
