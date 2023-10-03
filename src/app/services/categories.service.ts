import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../model/pageable.model";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn : 'root'
})
export class CategoriesService {

    private CATEGORIES_URL =`${environment.apiBaseUrl}/categories`;

    constructor(private httpClient: HttpClient) { }

    /** Get categories List */
    getAll(pageable:Pageable) {
        return this.httpClient.get<any[]>(`${this.CATEGORIES_URL}?page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort}&sortOrder=${pageable.sortOrder}`);
    }

    /** Get one category */
    getOne(categoryId:number) {
        return this.httpClient.get<any[]>(`${this.CATEGORIES_URL}/${categoryId}`);
    }

    /** Add category  */
    add(categoryObj:any) {
        return this.httpClient.post<any>(`${this.CATEGORIES_URL}`,categoryObj);
    }

    /** Update category */
    update(categoryObj:any) {
        return this.httpClient.put<any>(`${this.CATEGORIES_URL}`,categoryObj);
    }

    /** Delete category */
    delete(categoryId:number) {
        return this.httpClient.delete<any>(`${this.CATEGORIES_URL}/${categoryId}`);
    }
}