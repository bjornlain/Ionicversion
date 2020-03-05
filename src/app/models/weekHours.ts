import {Hours} from "./hours";

export class WeekHours{
    hours: Hours;
    weekNumber: number;
    startDay: number;
    endDay: number;
    constructor(weekNumber: number, hours: Hours, startDay: number, endDay: number) {
        this.hours = hours;
        this.weekNumber = weekNumber;
        this.startDay = startDay;
        this.endDay = endDay;
    }
}
