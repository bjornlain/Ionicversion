export class Worklog2{
    id: string;
    deleted: boolean;
    date: Date;
    description: string;
    task: string;
    user: string;
    worked: number;
    constructor(  id: string, deleted: boolean, date: Date, description: string, task: string, user: string, worked: number) {
        this.date = date;
        this.description = description;
        this.worked = worked;
        this.id = id;
        this.deleted = deleted;
        this.task = task;
        this.user = user;
    }
}
