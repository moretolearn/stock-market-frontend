import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Stock } from '../models/stock.model';
import { ApiResponse } from '../models/api-response.model';
const companyBaseUrl = 'http://localhost:8083/api/v1/company';
const stockBaseUrl = 'http://localhost:8081/api/v1/stock';
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {

  constructor(private http: HttpClient) {}
    getAll(): Observable<ApiResponse<Company[]>> {
      return this.http.get(`${companyBaseUrl}/getall`);
   }
   get(id: number): Observable<ApiResponse<Company>> {
    return this.http.get(`${companyBaseUrl}/info/${id}`);
  }
  add(company : Company): Observable<ApiResponse<any>> {
    return this.http.post(`${companyBaseUrl}/add`,company);
  }
  delete(id : number): Observable<ApiResponse<any>> {
    return this.http.delete(`${companyBaseUrl}/delete/${id}`);
  }
}
