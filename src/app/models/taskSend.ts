export class TaskSend{
    deleted: boolean;
    description: string;
    key: string;
    due: Date;
    project: string;
    summary: string;
    reporter: string;
    constructor(  deleted: boolean, key: string, reporter: string,
                  description: string, due: Date , summary: string, project: string) {
        this.project = project;
        this.reporter = reporter;
        this.summary = summary;
        this.due = due;
        this.description = description;
        this.deleted = deleted;
        this.key = key;
    }
}
