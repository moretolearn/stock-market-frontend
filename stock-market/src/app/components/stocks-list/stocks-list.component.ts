import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock.model';
import { StockmarketService } from 'src/app/services/stockmarket.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {


  stockDataSource = new MatTableDataSource<any>();


  @ViewChild(MatSort) matSort:MatSort;
  @ViewChild(MatPaginator) matPaginator:MatPaginator


  displayedColumns: string[] = ['stockCode', 'stockName', 'price', 'startDate', 'endDate', 'description', 'actions'];

  constructor(
    private smService: StockmarketService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getStocksList()
  }

  public getStocksList() {
    this.smService.getStockAll().subscribe(res => {
      console.log(res)
      this.stockDataSource.data = res.result;
      this.stockDataSource.sort= this.matSort;
      this.stockDataSource.paginator =  this.matPaginator;
    })
  }

  public onStockUpdate(row: any) {
console.log("hhh");
console.log(row)
  }

  public onStockDelete(row: any) {

    // this.smService.delete(row.stockCode).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     this.getStocksList()
    //   },
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stockDataSource.filter = filterValue.trim().toLowerCase();

    if (this.stockDataSource.paginator) {
      this.stockDataSource.paginator.firstPage();
    }
  }

  getStockDetails(stock:Stock){

console.log(stock)

this.router.navigate(['/stock-detalis'],{state:stock})
  }


}
