import {Worklog} from "./worklog";
import {Hours} from "./hours";

export class WorklogHours{
    worklog: Worklog;
    hours: Hours;
    constructor(worklog: Worklog, hours: Hours) {
        this.worklog = worklog;
        this.hours = hours;
    }
}
