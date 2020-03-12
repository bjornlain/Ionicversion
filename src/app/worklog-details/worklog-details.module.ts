import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {WorklogDetailsComponent} from './worklog-details.component';
import {Add07Pipe} from "../services/add07.pipe";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: WorklogDetailsComponent}])
    ],
    declarations: [WorklogDetailsComponent, Add07Pipe]
})
export class WorklogDetailsModule {}
