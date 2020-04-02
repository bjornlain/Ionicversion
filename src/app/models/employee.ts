export class Employee{
    _id: string;
    first_name: string;
    last_name: string;
    constructor(_id: string, first_name: string, last_name: string) {
        this._id = _id;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}
