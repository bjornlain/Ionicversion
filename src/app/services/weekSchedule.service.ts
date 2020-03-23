import { Injectable } from '@angular/core';
import { Date } from '../models/date';
import {WeekSchedule} from '../models/week-schedule';
import {Hour} from '../models/hour';

@Injectable({
    providedIn: 'root',
})
export class WeekScheduleService {
    scheduleArray: WeekSchedule[] = [{
        day: 'Monday',
        codingHours : new Hour( 8, 0, 0),
        socialHours : new Hour(0, 30, 0)
    },
        {
            day: 'Tuesday',
            codingHours : new Hour( 8, 0, 0),
            socialHours : new Hour(0, 30, 0)
        },
        {
            day: 'Wednesday',
            codingHours : new Hour( 8, 0, 0),
            socialHours : new Hour(0, 30, 0)
        },
        {
            day: 'Thursday',
            codingHours : new Hour( 8, 0, 0),
            socialHours : new Hour(0, 30, 0)
        },
        {
            day: 'Friday',
            codingHours : new Hour( 8, 0, 0),
            socialHours : new Hour(0, 30, 0)
        }];
    public getAll(): WeekSchedule[] {
        return this.scheduleArray;
    }
    public setDay(daySchedule: WeekSchedule) {
        switch (daySchedule.day) {
            case 'Monday':
                this.scheduleArray[0] = daySchedule;
                break;
            case 'Tuesday':
                this.scheduleArray[1] = daySchedule;
                break;
            case 'Wednesday':
                this.scheduleArray[2] = daySchedule;
                break;
            case 'Thursday':
                this.scheduleArray[3] = daySchedule;
                break;
            case 'Friday':
                this.scheduleArray[4] = daySchedule;
                break;
        }
    }
}
