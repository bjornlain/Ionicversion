import {Hours} from "./hours";

export class DayDate{
    hours: Hours;
    day: number;
    date: Date;
    description: string;
    constructor(hours: Hours , day: number, date: Date , description: string) {
        this.hours = hours;
        this.day = day;
        this.date = date;
        this.description = description;
    }
}
