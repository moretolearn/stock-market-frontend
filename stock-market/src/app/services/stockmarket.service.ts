import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Company } from '../models/company.model';
import { Stock } from '../models/stock.model';
import { ApiResponse } from '../models/api-response.model';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
const query = 'http://localhost:8083/api/v1/query/';
const companyQuery = query + 'company';
const stockQuery = query + 'stock';
const command = 'http://localhost:8083/api/v1/command/';
const companyCommand = command + 'company';
const stockCommand = command + 'stock'
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {
  config: NgxUiLoaderConfig
  constructor(
    private http: HttpClient,
    private ngxUi: NgxUiLoaderService,
    private dialog:MatDialog
    ) { this.config = this.ngxUi.getDefaultConfig() }
  getAll(): Observable<ApiResponse<Company[]>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/getall`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }
  get(id: number): Observable<ApiResponse<Company>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/info/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  add(company: Company): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.post(`${companyCommand}/add`, company).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  delete(id: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.delete(`${companyCommand}/delete/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  getCompanyStocksListByCompany(companyCode: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/info/${companyCode}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  getStocksListByCompany(companyCode: number): Observable<ApiResponse<Stock[]>> {
    this.ngxUi.start();
    return this.http.get(`${stockQuery}/getall/${companyCode}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  updateCompany(company: any, id: number): Observable<any> {
    this.ngxUi.start();
    return this.http.put<any>(`${companyCommand}/` + id, company).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  deleteStock(id: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.delete(`${stockCommand}/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  addStock(companyCode: number, stock: Stock): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.post(`${stockCommand}/add/${companyCode}`, stock).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  updateStock(stock: any, cid: number, id: number): Observable<any> {
    this.ngxUi.start();
    return this.http.put<any>(`${stockCommand}/` + cid + '/' + id, stock).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }));
  }

  getStocksByDates(companyCode: number, startDate: string, endDate: string): Observable<any> {
    this.ngxUi.start();
    return this.http.get(`${stockQuery}/get/${companyCode}/${startDate}/${endDate}`)
      .pipe(
        map((res: any) => {
          this.ngxUi.stop();
          return res;
        }),
        catchError(this.handleServerError)
      );
  }

  openDialog(msg: string, color: any): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { msg: msg, color: color }
    });
    dialogRef.afterClosed().subscribe(res => {
    });
  }

  handleServerError(error: any) {
    return throwError(() => {
      return error.error.message;
    });
  }
}
