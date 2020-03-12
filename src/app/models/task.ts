export class Task{
    _id: string;
    deleted: boolean;
    description: string;
    key: string;
    assignee: string;
    reporter: string;
    project: string;
    constructor(  _id: string, deleted: boolean, key: string, assignee: string,
                  description: string, reporter: string) {
        this.description = description;
        this.assignee = assignee;
        this._id = _id;
        this.deleted = deleted;
        this.key = key;
        this.reporter = reporter;
    }
}
