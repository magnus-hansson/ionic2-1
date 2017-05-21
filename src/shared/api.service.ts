import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service {
    private baseUrl = 'http://localhost/MobileOfficeApi2/api';
    constructor(private http: Http) { }

    loadRoomsFromApi() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/rooms/sweden//booked?hoursAhead=2`)
                .subscribe(res => resolve(res.json()));
        });
    }

    loadNews(take) {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/news?take=${take}`)
                .subscribe(res => resolve(res.json()));
        });
    }
}