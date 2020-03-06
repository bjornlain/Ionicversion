import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Token} from "../models/token";
import {Observable} from "rxjs";
import {Worklog2} from "../models/worklog2";
import {AuthService} from "./auth.service";


@Injectable({
    providedIn: 'root',
})
export class Worklog2Service {
    private authUrl: string;
    private worklogUrl: string;
    private workedHoursUrl: string;
    private admin: JSON = JSON.stringify({
        email: "bart@codious.io",
        password: "test1234"
    });
    public workLogs: Worklog2[] = [];
    private accessToken : string = undefined;
    options = {headers: {'Content-Type': 'application/json'}};
    constructor(private http: HttpClient , private authService: AuthService) {
        this.authUrl = 'http://localhost:4100/api/v1/auth.login';
        this.worklogUrl = 'http://localhost:4100/api/v1/worklogs.monthList';
        this.workedHoursUrl = 'http://localhost:4100/api/v1/worklogs.workedHours';
        this.authService.token.subscribe(x => {
            if(x) this.accessToken = x.access_token;
        });
    }
    getWorklogsFromMongo() {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        })
        this.http.get(this.worklogUrl, { headers: header }).subscribe(x => {
            this.workLogs = x as Worklog2[];
            console.log(this.workLogs);
        });
    }
    getWorkedHours(year: number, month: number , startDay: number, endDay: number){
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.accessToken,
            'year': year.toString(),
            'month': month.toString(),
            'startDay': startDay.toString(),
            'endDay': endDay.toString()
        })
        this.http.get(this.workedHoursUrl, { headers: header }).subscribe(x => {
            this.workLogs = x as Worklog2[];
            console.log(this.workLogs);
        });
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
