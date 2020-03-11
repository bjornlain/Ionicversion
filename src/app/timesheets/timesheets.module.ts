import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TimesheetsComponent} from './timesheets.component';
import {Add03Pipe} from "../services/add03.pipe";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TimesheetsComponent}])
    ],
    exports: [
        Add03Pipe
    ],
    declarations: [TimesheetsComponent, Add03Pipe]
})
export class TimeSheetsModule {}
