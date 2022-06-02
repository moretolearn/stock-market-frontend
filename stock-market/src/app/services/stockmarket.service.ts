import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { Stock } from '../models/stock.model';
import { ApiResponse } from '../models/api-response.model';
const query = 'http://localhost:8081/api/v1/';
const companyQuery = query + 'company';
const stockQuery = query + 'stock';
const command = 'http://localhost:8082/api/v1/';
const companyCommand = command + 'company';
const stockCommand = command + 'stock'
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<ApiResponse<Company[]>> {
    return this.http.get(`${companyQuery}/getall`);
  }
  get(id: number): Observable<ApiResponse<Company>> {
    return this.http.get(`${companyQuery}/info/${id}`);
  }
  add(company: Company): Observable<ApiResponse<any>> {
    return this.http.post(`${companyQuery}/add`, company);
  }
  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete(`${stockCommand}/delete/${id}`);
  }

  getStockAll(): Observable<ApiResponse<Stock[]>> {
    return this.http.get(`${stockQuery}/getall`);
  }
}
