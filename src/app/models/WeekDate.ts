import {Hours} from "./hours";

export class WeekDate{
    hours: Hours;
    weekDate: string;
    date: Date;
    constructor(hours: Hours , weekDate: string, date: Date) {
        this.hours = hours;
        this.weekDate = weekDate;
        this.date = date;
    }
}
