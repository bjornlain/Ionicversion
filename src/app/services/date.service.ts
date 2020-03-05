import { Injectable } from '@angular/core';
import { Date } from '../models/date';

@Injectable({
    providedIn: 'root',
})
export class DateService {
    public getAll(): Date[] {
        return [
            {
               date: 'Fri,27 December',
                hours: '08:00:16'
            },
            {
                date: 'Thu,26 December',
                hours: '08:00:34'
            },
            {
                date: 'Wed,25 December',
                hours: '08:05:16'
            },
            {
                date: 'Tue,24 December',
                hours: '08:12:37'
            },
            {
                date: 'Mon,23 December',
                hours: '08:00:16'
            },
        ];
    }
}
