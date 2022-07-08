import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Stock } from 'src/app/models/stock.model';
import { StockmarketService } from 'src/app/services/stockmarket.service';
import { AddStockComponent } from '../add-stock/add-stock.component';



@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

  stockDataSource = new MatTableDataSource<any>();


  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator


  displayedColumns: string[] = ['stockCode', 'stockName', 'price', 'startDate', 'endDate', 'description', 'actions'];


  startDate = new FormControl(new Date());
  endDate = new FormControl(new Date());

  constructor(
    private smService: StockmarketService,
    private router: Router,
    private dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  companyCode: number;

  ngOnInit(): void {
    this.companyCode = Number(localStorage.getItem('companyCode'));
    // this.getStocksList()
    this.getStocksListByCompany()
  }

  stockMinMaxAvgDto: any;

  @Output() company = new EventEmitter<any>();

  dataStore: any;

  public getStocksListByCompany() {
    this.smService.getCompanyStocksListByCompany(this.companyCode).subscribe(res => {
      console.log(res)
      this.dataStore = res;
      this.company.emit(res.result.object);
      this.stockDataSource.data = res.result.object.stocks;
      this.stockMinMaxAvgDto = res.result.stockMinMaxAvgDto;
      this.stockDataSource.sort = this.matSort;
      this.stockDataSource.paginator = this.matPaginator;
      this.getCalMinMaxAvg(res.result.object.stocks)

    })
  }

  public onStockDelete(row: any) {

    this.smService.deleteStock(row.stockCode, this.companyCode).subscribe({
      next: (res) => {
        console.log(res)
        this.getStocksListByCompany();
        this.smService.openDialog(res.message!, 'red')
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stockDataSource.filter = filterValue.trim().toLowerCase();

    if (this.stockDataSource.paginator) {
      this.stockDataSource.paginator.firstPage();
    }
  }

  getStockDetails(stock: Stock) {

    console.log(stock)

    this.router.navigate(['/stock-detalis'], { state: stock })
  }

  addDialog() {
    this.dialog.open(AddStockComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getStocksListByCompany();
      }
    });
  }

  updateStock(row: any) {
    this.dialog.open(AddStockComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getStocksListByCompany()
      }
    })
  }

  searchStocksList() {
    console.log(this.startDate.value)
    console.log(this.endDate.value)
    // const startDate = moment(this.startDate.value, 'DD/MM/YYYY');
    // const startDateString = startDate.isValid() ? startDate.toDate() : null;

    // const endDate = moment(this.startDate.value, 'DD/MM/YYYY');
    // const endDateString = endDate.isValid() ? endDate.toDate() : null;
    let startDate = moment(this.startDate.value).format("DD-MM-yyyy");
    let endDate = moment(this.endDate.value).format("DD-MM-yyyy")
    console.log(startDate)
    console.log(endDate)

    // var dateString = formatDate('','yyyy-MM-dd',this.locale);
    this.smService.getStocksByDates(this.companyCode, startDate, endDate).subscribe(res => {
      console.log(res)
      this.stockDataSource.data = res.result.object;
      this.stockMinMaxAvgDto = res.result.stockMinMaxAvgDto;
      this.stockDataSource.sort = this.matSort;
      this.stockDataSource.paginator = this.matPaginator;
      this.getCalMinMaxAvg(res.result.object)
    })
  }

  resetSearchStocksList() {
    this.company.emit(this.dataStore.result.object);
    this.stockDataSource.data = this.dataStore.result.object.stocks;
    this.stockMinMaxAvgDto = this.dataStore.result.stockMinMaxAvgDto;
    this.stockDataSource.sort = this.matSort;
    this.stockDataSource.paginator = this.matPaginator;
    this.getCalMinMaxAvg(this.dataStore.result.object.stocks)
  }

  avg !: any;
  min !: number;
  max !: number;

  getCalMinMaxAvg(stocklistData: any) {
    if (stocklistData.length > 0) {
      this.max = stocklistData[0].price;
      this.min = stocklistData[0].price;
      var sum = stocklistData[0].price;
      for (var i = 1; i < stocklistData.length; i++) {
        if (stocklistData[i].price > this.max) {
          this.max = stocklistData[i].price;
        }
        if (stocklistData[i].price < this.min) {
          this.min = stocklistData[i].price;
        }
        sum = sum + stocklistData[i].price;
      }
      this.avg = Number(sum / stocklistData.length).toFixed(2)
    } else {
      this.min = 0;
      this.max = 0;
      this.avg = 0;
    }
  }
}
