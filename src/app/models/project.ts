import {Lead} from "./lead";

export class Project {
    _id: string;
    deleted: boolean;
    kind: string;
    name: string;
    lead: Lead;
    key: string;
    constructor(_id: string, deleted: boolean, kind: string, name: string, lead: Lead, key: string) {
        this._id = _id;
        this.deleted = deleted;
        this.kind = kind;
        this.name = name;
        this.lead = lead;
        this.key = key;
    }
}
