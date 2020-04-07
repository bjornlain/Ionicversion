export class User{
    deleted: boolean;
    email: string;
    name: string;
    _id: string;
    constructor(deleted: boolean, email: string, name: string, _id: string) {
        this._id = _id;
        this.name = name;
        this.deleted = deleted;
        this.email = email;
    }
}
