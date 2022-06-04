import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    private dialog: MatDialog
  ) { }

  companyCode:number;

  ngOnInit(): void {
    this.companyCode = Number(localStorage.getItem('companyCode'));
    // this.getStocksList()
    this.getStocksListByCompany()
  }

  @Output() company = new EventEmitter<any>();

  public getStocksListByCompany() {
    this.smService.getCompanyStocksListByCompany(this.companyCode).subscribe(res => {
      console.log(res)
      this.company.emit(res.result);
      this.stockDataSource.data = res.result.stocks;
      this.stockDataSource.sort = this.matSort;
      this.stockDataSource.paginator = this.matPaginator;
    })
  }

  public onStockDelete(row: any) {

    this.smService.deleteStock(row.stockCode).subscribe({
      next: (res) => {
        console.log(res)
        this.getStocksListByCompany();
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

}
