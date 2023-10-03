import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn : 'root'
})
export class BookingsService {

    private BOOKINGS_URL =`${environment.apiBaseUrl}/bookings`;

    constructor(private httpClient: HttpClient) { }

    /** Get bookings List */
    getAll(pageable:Pageable) {
        return this.httpClient.get<any[]>(`${this.BOOKINGS_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
    }

    /** Get one booking */
    getOne(bookingId:number) {
        return this.httpClient.get<any[]>(`${this.BOOKINGS_URL}/${bookingId}`);
    }

    /** Add booking  */
    add(bookingObj:any) {
        return this.httpClient.post<any>(`${this.BOOKINGS_URL}`,bookingObj);
    }

    /** Update booking */
    update(bookingObj:any) {
        return this.httpClient.put<any>(`${this.BOOKINGS_URL}`,bookingObj);
    }

    /** Delete booking */
    delete(bookingId:number) {
        return this.httpClient.delete<any>(`${this.BOOKINGS_URL}/${bookingId}`);
    }
}