import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Company } from '../models/company.model';
import { Stock } from '../models/stock.model';
import { ApiResponse } from '../models/api-response.model';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { JwtHelperService } from '@auth0/angular-jwt';
const apigateway = 'http://localhost:8083/api/v1/'
const query = apigateway + 'query/';
const companyQuery = query + 'company';
const stockQuery = query + 'stock';
const command = apigateway + 'command/';
const companyCommand = command + 'company';
const stockCommand = command + 'stock'
const TOKEN_AUTH_USERNAME = 'testjwtclientid'
const TOKEN_AUTH_PASSWORD = 'XY7kmzoNzl100'
const AUTH_TOKEN = 'auth/oauth/token'
@Injectable({
  providedIn: 'root'
})
export class StockmarketService {
  config: NgxUiLoaderConfig;

  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }

  constructor(
    private http: HttpClient,
    private ngxUi: NgxUiLoaderService,
    private dialog: MatDialog,
    private jwtSM: JwtHelperService
  ) { this.config = this.ngxUi.getDefaultConfig() }

  getAll(): Observable<ApiResponse<Company[]>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/getall`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }
  get(id: number): Observable<ApiResponse<Company>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/info/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  add(company: Company): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.post(`${companyCommand}/add`, company).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  delete(id: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.delete(`${companyCommand}/delete/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  getCompanyStocksListByCompany(companyCode: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.get(`${companyQuery}/info/${companyCode}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  getStocksListByCompany(companyCode: number): Observable<ApiResponse<Stock[]>> {
    this.ngxUi.start();
    return this.http.get(`${stockQuery}/getall/${companyCode}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  updateCompany(company: any, id: number): Observable<any> {
    this.ngxUi.start();
    return this.http.put<any>(`${companyCommand}/` + id, company).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  deleteStock(id: number): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.delete(`${stockCommand}/${id}`).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  addStock(companyCode: number, stock: Stock): Observable<ApiResponse<any>> {
    this.ngxUi.start();
    return this.http.post(`${stockCommand}/add/${companyCode}`, stock).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  updateStock(stock: any, cid: number, id: number): Observable<any> {
    this.ngxUi.start();
    return this.http.put<any>(`${stockCommand}/` + cid + '/' + id, stock).pipe(map((res: any) => {
      this.ngxUi.stop();
      return res;
    }),
      catchError(data => {
        return this.handleServerError(data)
      })
    );
  }

  getStocksByDates(companyCode: number, startDate: string, endDate: string): Observable<any> {
    this.ngxUi.start();
    return this.http.get(`${stockQuery}/get/${companyCode}/${startDate}/${endDate}`)
      .pipe(
        map((res: any) => {
          this.ngxUi.stop();
          return res;
        }),
        catchError(data => {
          return this.handleServerError(data)
        })
      );
  }

  registration(registerForm: any): Observable<any> {
    let url = 'http://localhost:8083/api/v1/auth/springjwt/signup'
    this.ngxUi.start();
    return this.http.post(url, registerForm)
      .pipe(
        map((res: any) => {
          this.ngxUi.stop();
          return res;
        }),
        catchError(data => {
          return this.handleServerError(data)
        })
      );
  }


  getTokenFromBackEnd1(loginForm: any): Observable<any> {
    let url = 'http://localhost:9191/end-user/token'
    this.ngxUi.start();
    return this.http.post(url, loginForm)
      .pipe(
        map((res: any) => {
          this.ngxUi.stop();
          return res;
        }),
        catchError(data => {
          return this.handleServerError(data)
        })
      );
  }

  getTokenFromBackEnd(loginForm: any): Observable<any> {

    const body = `username=${encodeURIComponent(loginForm.userName)}&password=${encodeURIComponent(loginForm.password)}&grant_type=password`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD)
    })

    return this.http.post(apigateway + AUTH_TOKEN, body, { headers: headers })
      .pipe(
        map((res: any) => {
          this.ngxUi.stop();
          return res;
        }),
        catchError(data => {
          return this.handleServerError(data)
        })
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
    console.log(error)
    this.ngxUi.stop();
    if (error.status == 0) {
      this.openDialog('Back end server down or internal server error', 'red');
    } else if (error.status == 400) {
      if(error.error.result){
        this.openDialog(error.error?.result?.errMsg, 'red');
      }else if(error.error.error_description){
        this.openDialog(error.error.error_description, 'red');
      }else{
        this.openDialog(error.message, 'red');
      }
    } else {
      this.openDialog(error.message, 'red');
    }

    return throwError(() => {
      return error.message;
    });
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRoles(): any {
    let tokenPart = this.getToken().split('.')[1];
    // let rolesParse = Buffer.from(tokenPart, 'base64').toString('binary');
    let rolesParse = atob(tokenPart);
    console.log(rolesParse)
    let roles = JSON.parse(rolesParse);
    console.log(roles)
    let t = this.jwtSM.decodeToken(this.getToken())
    console.log(t)
    let date = this.jwtSM.getTokenExpirationDate(this.getToken());
    console.log(date)
    let isToken = this.jwtSM.isTokenExpired(this.getToken())
    console.log(isToken)
    return roles;
  }
}


