import {Hours} from './hours';

export class WeekSchedule{
    day: string;
    codingHours: Hours;
    socialHours: Hours;
    constructor(day: string, codingHours: Hours, socialHours: Hours) {
        this.day = day;
        this.codingHours = codingHours;
        this.socialHours = socialHours;
    }
}
