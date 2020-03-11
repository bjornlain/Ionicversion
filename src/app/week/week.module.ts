import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {WeekComponent} from './week.component';
import {Add06Pipe} from "../services/add06.pipe";
import {TabsPageModule} from "../tabs/tabs.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: WeekComponent}])
  ],
    declarations: [WeekComponent, Add06Pipe]
})
export class WeekModule {}
