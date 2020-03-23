import {Hour} from "./hour";
import {Task} from './task';

export class DayDate{
    hours: Hour;
    _id: string;
    day: number;
    startDate: Date;
    endDate: Date;
    description: string;
    task: Task;
    constructor(_id: string, hours: Hour , day: number, startDate: Date, endDate: Date, description: string , task: Task) {
        this.hours = hours;
        this._id = _id;
        this.day = day;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.task = task;
    }
}
