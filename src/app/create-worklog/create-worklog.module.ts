import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CreateWorklogComponent} from "./create-worklog.component";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: CreateWorklogComponent}])
  ],
  declarations: [CreateWorklogComponent]
})
export class CreateWorklogModule {}
