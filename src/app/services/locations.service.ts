import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn : 'root'
})
export class LocationsService {

    private LOCATIONS_URL =`${environment.apiBaseUrl}/locations`;

    constructor(private httpClient: HttpClient) { }

    /** Get locations List */
    getAll(pageable:Pageable) {
        return this.httpClient.get<any[]>(`${this.LOCATIONS_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
    }

    /** Get one location */
    getOne(locationId:number) {
        return this.httpClient.get<any[]>(`${this.LOCATIONS_URL}/${locationId}`);
    }

    /** Add location  */
    add(locationObj:any) {
        return this.httpClient.post<any>(`${this.LOCATIONS_URL}`,locationObj);
    }

    /** Update location */
    update(locationObj:any) {
        return this.httpClient.put<any>(`${this.LOCATIONS_URL}`,locationObj);
    }

    /** Delete location */
    delete(locationId:number) {
        return this.httpClient.delete<any>(`${this.LOCATIONS_URL}/${locationId}`);
    }
}