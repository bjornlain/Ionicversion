export class WorklogSend{
    deleted: boolean;
    startDate: Date;
    endDate: Date;
    description: string;
    task: string;
    user: string;
    worked: number;
    constructor( deleted: boolean, startDate: Date, endDate: Date, description: string, task: string, user: string, worked: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.worked = worked;
        this.deleted = deleted;
        this.task = task;
        this.user = user;
    }
}
