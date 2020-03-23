import {Worklog} from "./worklog";
import {Hour} from "./hour";

export class WorklogHours{
    worklog: Worklog;
    hours: Hour;
    constructor(worklog: Worklog, hours: Hour) {
        this.worklog = worklog;
        this.hours = hours;
    }
}
