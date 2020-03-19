import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UpdateWorklogComponent} from "./update-worklog.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: UpdateWorklogComponent}])
  ],
    declarations: [UpdateWorklogComponent]
})
export class UpdateWorklogModule {}
