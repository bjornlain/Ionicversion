export class TaskSend{
    deleted: boolean;
    description: string;
    key: string;
    assignee: string;
    reporter: string;
    due: Date;
    project: string;
    summary: string;
    constructor(  deleted: boolean, key: string, assignee: string,
                  description: string, reporter: string , due: Date , summary: string, project: string) {
        this.project = project;
        this.summary = summary;
        this.due = due;
        this.description = description;
        this.assignee = assignee;
        this.deleted = deleted;
        this.key = key;
        this.reporter = reporter;
    }
}
