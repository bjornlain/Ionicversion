import {Hour} from "./hour";

export class WeekDate{
    hour: Hour;
    weekDate: string;
    date: Date;
    constructor(hour: Hour , weekDate: string, date: Date) {
        this.hour = hour;
        this.weekDate = weekDate;
        this.date = date;
    }
}
