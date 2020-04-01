import {Hour} from "./hour";

export class WeekDate{
    _id: string;
    hour: Hour;
    dayString: string;
    date: Date;
    constructor(_id: string, hour: Hour , dayString: string, date: Date) {
        this._id = _id;
        this.hour = hour;
        this.dayString = dayString;
        this.date = date;
    }
}
