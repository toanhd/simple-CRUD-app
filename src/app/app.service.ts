///<reference path="../../node_modules/@angular/http/src/http.d.ts"/>
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {catchError, map, filter, switchMap} from "rxjs/operators";
// import {Observable, Subject, ReplaySubject, from, of, range} from 'rxjs'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {
    url = 'http://localhost:3000/';

    constructor(private http: Http) {
    }


    create(user) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.url + 'create', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json(),
                        code: response.status
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }

    read() {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get(this.url + 'read', {headers: headers})
            .pipe(map((response: Response) => response.json())
                , catchError((error: Response) => Observable.throw(error.json())))
    }

    delete(inputUsers) {
        const usersID = [];
        const headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        const _http = this.http;
        const _url = this.url;
        inputUsers.forEach(function (user) {
            console.log('log')
            return _http.delete(_url + 'delete/' + user._id, options)
                .pipe(catchError((error: Response) => Observable.throw(error.json())))
        });
    }

    update(userID, cell, cellValue) {
        const body = JSON.stringify({
            userId: userID,
            cell: cell,
            cellValue: cellValue
        });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.url + 'update', body, {headers: headers})
            .pipe(map((response: Response) => {
                    return {
                        response: response.json()
                    }
                }), catchError((error: Response) => Observable.throw(error.json()))
            )
    }
}

