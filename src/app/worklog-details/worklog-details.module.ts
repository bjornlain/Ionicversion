import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorklogDetailsComponent} from './worklog-details.component';
import {Add07Pipe} from "../services/add07.pipe";
import {Add08Pipe} from "../services/add08.pipe";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: WorklogDetailsComponent}])
    ],
    declarations: [WorklogDetailsComponent, Add07Pipe, Add08Pipe]
})
export class WorklogDetailsModule {}
