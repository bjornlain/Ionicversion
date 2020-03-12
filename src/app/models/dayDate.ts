import {Hours} from "./hours";

export class DayDate{
    hours: Hours;
    id: string;
    day: number;
    startDate: Date;
    endDate: Date;
    description: string;
    task: string;
    constructor(id: string, hours: Hours , day: number, startDate: Date, endDate: Date, description: string , task: string) {
        this.hours = hours;
        this.id = id;
        this.day = day;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.task = task;
    }
}
