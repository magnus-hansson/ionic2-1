import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
@Injectable()
export class Service {
    private baseUrl = 'http://localhost/MobileOfficeApi2/api/';
    constructor(private http: Http) { }

    loadRoomsFromApi() {
        return new Promise(resolve => {
            this.http.get(`{$this.baseUrl}rooms/sweden//booked?hoursAhead=2`)
                //this.http.get('http://localhost/MobileOfficeApi2/api/rooms/sweden//booked?hoursAhead=2')
                .subscribe(res => resolve(res.json()));
        });
    }
}