import {Hours} from "./hours";

export class DayDate{
    hours: Hours;
    day: number;
    startDate: Date;
    endDate: Date;
    description: string;
    constructor(hours: Hours , day: number, startDate: Date, endDate: Date, description: string) {
        this.hours = hours;
        this.day = day;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
