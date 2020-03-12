import {Task} from './task';

export class Worklog{
    id: string;
    deleted: boolean;
    startDate: Date;
    endDate: Date;
    description: string;
    task: Task;
    user: string;
    worked: number;
    constructor(  id: string, deleted: boolean, startDate: Date, endDate: Date,
                  description: string, task: Task, user: string, worked: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.worked = worked;
        this.id = id;
        this.deleted = deleted;
        this.task = task;
        this.user = user;
    }
}
