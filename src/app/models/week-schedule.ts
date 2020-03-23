import {Hour} from './hour';

export class WeekSchedule{
    day: string;
    codingHours: Hour;
    socialHours: Hour;
    constructor(day: string, codingHours: Hour, socialHours: Hour) {
        this.day = day;
        this.codingHours = codingHours;
        this.socialHours = socialHours;
    }
}
