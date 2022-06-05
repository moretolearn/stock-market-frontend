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
    return this.http.delete(`${companyCommand}/delete/${id}`);
  }

  getCompanyStocksListByCompany(companyCode:number): Observable<ApiResponse<any>> {
    return this.http.get(`${companyQuery}/info/${companyCode}`);
  }

  getStocksListByCompany(companyCode:number): Observable<ApiResponse<Stock[]>> {
    return this.http.get(`${stockQuery}/getall/${companyCode}`);
  }

  updateCompany(company : any, id: number): Observable<any>{
    return this.http.put<any>(`${companyQuery}/`+id,company);
  }

  deleteStock(id: number): Observable<ApiResponse<any>> {
    return this.http.delete(`${stockCommand}/${id}`);
  }

  addStock(companyCode:number,stock: Stock): Observable<ApiResponse<any>> {
    return this.http.post(`${stockCommand}/add/${companyCode}`, stock);
  }

  updateStock(stock : any, cid:number, id: number): Observable<any>{
    return this.http.put<any>(`${stockCommand}/`+cid+'/'+id,stock);
  }

  getStocksByDates(companyCode:number,startDate:string,endDate:string): Observable<any>{
    return this.http.get(`${stockQuery}/get/${companyCode}/${startDate}/${endDate}`);
  }
}
