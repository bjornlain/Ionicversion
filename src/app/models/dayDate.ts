import {Hours} from "./hours";
import {Task} from './task';

export class DayDate{
    hours: Hours;
    id: string;
    day: number;
    startDate: Date;
    endDate: Date;
    description: string;
    task: Task;
    constructor(id: string, hours: Hours , day: number, startDate: Date, endDate: Date, description: string , task: Task) {
        this.hours = hours;
        this.id = id;
        this.day = day;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.task = task;
    }
}
