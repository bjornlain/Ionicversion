export class Worklog{
    id: string;
    name: string;
    date: Date;
    description: string;
    worked: number;
    constructor(date: Date, description: string, worked: number, name: string, id: string) {
        this.date = date;
        this.description = description;
        this.worked = worked;
        this.id = id;
        this.name = name;
    }
}
