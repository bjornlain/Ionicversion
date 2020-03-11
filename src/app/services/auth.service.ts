import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from "../models/token";
import {BehaviorSubject, Observable} from "rxjs";
import {Worklog} from "../models/worklog";


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authUrl: string;
    private admin = JSON.stringify({
        email: "bart@codious.io",
        password: "test1234"
    });
    options = {headers: {'Content-Type': 'application/json'}};
    public token : BehaviorSubject<Token | undefined> = new BehaviorSubject(undefined);
    private access_token : string = undefined;
    constructor(private http: HttpClient) {
        this.authUrl = 'http://localhost:4100/api/v1/auth.login';
        this.login().then(x => {
            this.token.next(x as Token);
        });
    }

    async login() {
        const res = await this.http.post(this.authUrl, this.admin, this.options).toPromise() as Token;
        console.log(res);

        return res;
    }
    getBearerToken() {
        return this.access_token;
    }
    /*
    getLoggedInUser(auth_token): Observable<any> {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': auth_token
        })
        return this.http.get(apiUrl, { headers: headers })
    } */
    /*  getCars(): Observable<Car[]> {
          return this.http.get<Car[]>(this.apiUrl);
      }
      addCar(car: Car): Observable<Object>{
          return this.http.post(this.apiUrl, car);
      }

      removeCar(car: Car): Observable<Object>{
          return this.http.delete(`${this.apiUrl}/${car._id}`);
      }

      editCar(car: Car): Observable<Object>{
          return this.http.put(this.apiUrl, car);
      } */
}
